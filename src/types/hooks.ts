import { ENSProfile } from './profile'
import { Address } from './address'

/**
 * Return type for useProfileDetails hook
 */
export interface UseProfileDetailsReturn {
  /** Profile details data */
  ens: ENSProfile | undefined
  address: Address | undefined
  detailsLoading: boolean
  refreshProfileDetails: () => void
}
