import { Address, ProfileDetailsResponse } from '../../../types'
import { ProfileSocialType } from '../../../types/profile'

export type ProfileExtraOptions = {
  role?: string
  nameMenu?: React.ReactNode
  onEditProfileClick?: () => void
  prefetched?: {
    profile: {
      data: ProfileDetailsResponse | undefined
      isLoading: boolean
      refetch: () => void
    }
  }
  hideSocials?: ProfileSocialType[]
  onBioLinkClick?: (link: string) => void
}

export interface FullWidthProfileProps {
  addressOrName: Address | string
  connectedAddress?: Address
  darkMode?: boolean
  showEmptySocials?: boolean
  onProfileClick?: (addressOrName: Address | string) => void
  extraOptions?: ProfileExtraOptions
  className?: string
  style?: React.CSSProperties
  alignProfileContent?: 'center' | 'start' | 'end'
}
