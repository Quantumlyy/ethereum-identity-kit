import { Address } from '../../../types/address'
import { ProfileExtraOptions } from '../full-width-profile/FullWidthProfile.types'

export type ProfileCardProps = {
  addressOrName: Address | string
  connectedAddress?: Address
  darkMode?: boolean
  showEmptySocials?: boolean
  onProfileClick?: (addressOrName: Address | string) => void
  extraOptions?: ProfileExtraOptions
} & React.HTMLAttributes<HTMLDivElement>
