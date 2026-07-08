import { Address } from '..'

/**
 * ENS profile data structure containing all profile information
 */
export type ENSProfile = {
  /** ENS name (e.g., "vitalik.eth") */
  name?: string
  /** Avatar image URL or NFT reference */
  avatar?: string
  /** Display name for the profile */
  display?: string
  /** Header/banner image URL */
  header?: string
  /** IPFS content hash for decentralized content */
  contenthash?: string
  /** Key-value pairs of ENS text records */
  records?: Record<string, string>
  /** Cross-chain address mappings */
  chains?: Record<string, string>
  /** Timestamp of last data refresh */
  fresh?: number
  /** ENS resolver contract address */
  resolver?: string
  /** Any errors encountered during profile resolution */
  errors?: Record<string, string>
}

export type ENSMetadataProfile = {
  uri: string
  is_owner: boolean
  full_image: string
  full_svg: string
  svg: string
  host_meta: {
    chain_id: string | number
    namespace: string
    contract_address: string
    token_id: string | number
    reference_url: string
  }
  name: string
  description: string
  attribute: string
  image: string
  image_url: string
  image_data: string
  background_color: string
  youtube_url: string
}

export type ProfileDetailsResponse = {
  address: Address
  ens: ENSProfile
}

export type AccountResponseType = {
  address: Address
  ens?: {
    name: string | null
    avatar: string | null
    records: Record<string, string>
  }
}

export type ProfileSocialType =
  | 'etherscan'
  | 'com.twitter'
  | 'com.github'
  | 'org.telegram'
  | 'com.discord'
  | 'grails'
  | 'opensea'
  | 'vision'
  | 'website'
  | 'email'
  | 'ens'
