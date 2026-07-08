import { createPublicClient, isAddress, type Address } from 'viem'
import { mainnet } from 'viem/chains'
import { transports } from '../../constants/transports'
import { TEXT_RECORD_KEYS } from '../../constants/records'
import { normalizeEnsName } from '../ens'

/**
 * Shape returned by the client-side ENS resolver. Mirrors the fields the
 * identity components consume (name, avatar, header, text records) without
 * any Ethereum Follow Protocol data.
 */
export type ResolvedEnsProfile = {
  address: Address
  name: string | null
  avatar: string | null
  header: string | null
  records: Record<string, string>
}

/**
 * Resolves an Ethereum address or ENS name to its ENS identity profile using
 * client-side viem calls against mainnet (no third-party API).
 *
 * - Given an address, performs a reverse lookup for the primary name.
 * - Given a name, resolves the forward address.
 * - In both cases, when a name is available, resolves the avatar and the
 *   standard ENS text records used by the profile components.
 */
export const resolveEnsProfile = async (addressOrName: string): Promise<ResolvedEnsProfile | null> => {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: transports[mainnet.id],
    batch: { multicall: true },
  })

  try {
    let name: string | null = null
    let address: Address | null = null

    if (isAddress(addressOrName)) {
      address = addressOrName
      name = await publicClient.getEnsName({ address })
    } else {
      name = normalizeEnsName(addressOrName)
      address = await publicClient.getEnsAddress({ name })
    }

    const records: Record<string, string> = {}
    let avatar: string | null = null

    if (name) {
      const [resolvedAvatar, ...textValues] = await Promise.all([
        publicClient.getEnsAvatar({ name }).catch(() => null),
        ...TEXT_RECORD_KEYS.map((key) => publicClient.getEnsText({ name: name as string, key }).catch(() => null)),
      ])

      TEXT_RECORD_KEYS.forEach((key, index) => {
        const value = textValues[index]
        if (value) records[key] = value
      })

      avatar = resolvedAvatar ?? records['avatar'] ?? null
    }

    // An address input always yields an address; a name input that does not
    // forward-resolve has no on-chain identity, so report it as "not found"
    // rather than returning a placeholder zero address.
    if (!address) return null

    return {
      address,
      name,
      avatar,
      header: records['header'] ?? null,
      records,
    }
  } catch (err: unknown) {
    console.error(err)
    return null
  }
}
