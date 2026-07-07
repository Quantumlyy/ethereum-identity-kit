import { Address } from '../../../types'
import type { ProfileDetailsResponse, ProfileSocialType } from '../../../types/profile'

export interface ProfileSocialsProps {
  name?: string
  userAddress?: Address
  records: ProfileDetailsResponse['ens']['records']
  includeUrls?: boolean
  showEmptySocials?: boolean
  iconSize?: number
  isLoading?: boolean
  darkMode?: boolean
  style?: React.CSSProperties
  hideSocials?: ProfileSocialType[]
}
