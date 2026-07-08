import { AccountResponseType } from '../../types/profile'
import { resolveEnsProfile } from './resolve-ens-profile'

/**
 * Resolves an address or ENS name to its account (address + ENS name/avatar/
 * records) using client-side ENS resolution (viem). Replaces the previous
 * Ethereum Follow Protocol API.
 */
export const fetchAccount = async (addressOrName: string): Promise<AccountResponseType | null> => {
  const resolved = await resolveEnsProfile(addressOrName)
  if (!resolved) return null

  return {
    address: resolved.address,
    ens: {
      name: resolved.name,
      avatar: resolved.avatar,
      records: resolved.records,
    },
  }
}
