import { ProfileDetailsResponse } from '../../types/profile'
import { resolveEnsProfile } from './resolve-ens-profile'

/**
 * Fetches the ENS identity profile for an address or name using client-side
 * ENS resolution (viem). Replaces the previous Ethereum Follow Protocol API.
 */
export const fetchProfileDetails = async (addressOrName: string): Promise<ProfileDetailsResponse | null> => {
  const resolved = await resolveEnsProfile(addressOrName)
  if (!resolved) return null

  return {
    address: resolved.address,
    ens: {
      name: resolved.name ?? undefined,
      avatar: resolved.avatar ?? undefined,
      header: resolved.header ?? undefined,
      records: resolved.records,
    },
  }
}
