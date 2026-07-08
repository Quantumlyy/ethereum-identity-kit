import React from 'react'
import clsx from 'clsx'
import { useProfileDetails, useGrailsProfile } from '../../../hooks'
import { beautifyEnsName, truncateAddress } from '../../../utils'
import Bio from '../profile-card/components/bio'
import Avatar from '../../molecules/avatar/Avatar'
import HeaderImage from '../profile-card/components/HeaderImage'
import LoadingCell from '../../atoms/loading-cell/LoadingCell'
import { DEFAULT_FALLBACK_AVATAR } from '../../../constants'
import { ProfileTooltipProps } from './ProfileTooltip.types'
import ProfileSocials from '../../molecules/profile-socials/ProfileSocials'
import type { GrailsProfileResponse } from '../../../types'
import { ENS as ENSIcon, Grails as GrailsIcon, Ethereum as EthereumIcon } from '../../icons'

const formatTimeAgo = (dateString?: string | null) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return 'N/A'

  const diffSeconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (diffSeconds < 60) return 'just now'

  const diffMinutes = Math.floor(diffSeconds / 60)
  if (diffMinutes < 60) return `${diffMinutes}min ago`

  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours}h ago`

  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 7) return `${diffDays}d ago`

  const diffWeeks = Math.floor(diffDays / 7)
  if (diffDays < 30) return `${diffWeeks}w ago`

  const diffMonths = Math.floor(diffDays / 30)
  if (diffDays < 365) return `${diffMonths}mo ago`

  const diffYears = Math.floor(diffDays / 365)
  return `${diffYears}y ago`
}

const getGrailsNameCount = (grailsProfile?: GrailsProfileResponse['data']) => {
  return grailsProfile?.stats?.totalNames ?? grailsProfile?.ownedNames?.length ?? 0
}

type GrailsProfileSectionProps = {
  addressOrName: string
}

const GrailsProfileSection: React.FC<GrailsProfileSectionProps> = ({ addressOrName }) => {
  const { data: grailsData, isLoading: isGrailsLoading } = useGrailsProfile({
    addressOrName,
    enabled: true,
  })

  const grailsProfile = grailsData?.data

  if (!isGrailsLoading && !grailsProfile) return null

  return (
    <div className="tooltip-grails-data">
      {isGrailsLoading ? (
        <div className="grails-loading">
          <LoadingCell height="14px" width="100%" />
          <LoadingCell height="14px" width="100%" />
          <LoadingCell height="14px" width="100%" />
        </div>
      ) : grailsProfile ? (
        <>
          <div className="grails-stat">
            <div className="grails-stat-label-container">
              <GrailsIcon width={14} height={14} />
              <span className="grails-stat-label">Last seen on Grails:</span>
            </div>
            <span className="grails-stat-value">{formatTimeAgo(grailsProfile.lastSeenAt)}</span>
          </div>
          <div className="grails-stat">
            <div className="grails-stat-label-container">
              <EthereumIcon width={14} height={14} />
              <span className="grails-stat-label">Last tx on Ethereum:</span>
            </div>
            <span className="grails-stat-value">{formatTimeAgo(grailsProfile.lastSeenOnchain)}</span>
          </div>
          <div className="grails-stat">
            <div className="grails-stat-label-container">
              <ENSIcon width={14} height={14} color="#0080BC" />
              <span className="grails-stat-label">Number of names they own:</span>
            </div>
            <span className="grails-stat-value">{getGrailsNameCount(grailsProfile)}</span>
          </div>
        </>
      ) : null}
    </div>
  )
}

/**
 * Tooltip card for an Ethereum Profile. Displays ENS identity data (and optional
 * Grails activity) in any Web3 app.
 *
 * @param addressOrName - Ethereum Address or ENS name to fetch profile data for (required)
 *
 * @param connectedAddress - Address of the user connected to the app (optional)
 *
 * @param darkMode - (optional)
 *
 * @param includeGrails - shows Grails activity for the profile (optional)
 *
 * @param className - string (optional)
 *
 * @param style - CSS Properties (optional)
 *
 * @param props - HTML div element props (optional)
 *
 * @returns ProfileTooltipCard component
 */
const ProfileTooltipCard: React.FC<ProfileTooltipProps> = ({
  addressOrName,
  darkMode,
  showSocials,
  showEmptySocials,
  showBio = true,
  showStatus,
  includeGrails = false,
  onProfileClick = (addressOrname) => {
    window.open(`https://app.ens.domains/${addressOrname}`, '_blank', 'noopener,noreferrer')
  },
  extraOptions,
  className,
  style,
  ...props
}) => {
  const { prefetched, onBioLinkClick } = extraOptions || {}
  const { profile } = prefetched || {}

  const { ens, address, detailsLoading } = useProfileDetails({
    addressOrName,
    prefetchedData: profile?.data,
  })
  const isDetailsLoading = profile?.isLoading ?? detailsLoading

  return (
    <div
      className={clsx('tooltip-card', darkMode && 'dark dark-tooltip-card', className)}
      data-testid="tooltip-card"
      style={{ fontFamily: 'Inter, sans-serif', ...style }}
      {...props}
    >
      <HeaderImage
        src={ens?.records?.header}
        name={ens?.name}
        isLoading={isDetailsLoading}
        style={{ borderTopLeftRadius: style?.borderRadius, borderTopRightRadius: style?.borderRadius, height: '80px' }}
      />
      <div className="tooltip-details">
        <div className="tooltip-avatar-container">
          {isDetailsLoading ? (
            <LoadingCell height="75px" width="75px" radius="50%" />
          ) : (
            <Avatar
              address={addressOrName}
              src={ens?.avatar}
              name={ens?.name}
              fallback={DEFAULT_FALLBACK_AVATAR}
              style={{ width: '75px', height: '75px' }}
              onClick={() => onProfileClick?.(addressOrName)}
            />
          )}
        </div>
        {isDetailsLoading ? (
          <LoadingCell height="26px" width="160px" />
        ) : (
          <div className="tooltip-name-container">
            <p
              className="tooltip-name"
              enable-hover={!!onProfileClick ? 'true' : 'false'}
              onClick={() => onProfileClick?.(addressOrName)}
            >
              {ens?.name ? beautifyEnsName(ens.name) : address ? truncateAddress(address) : addressOrName}
            </p>
          </div>
        )}
        {showStatus && ens?.records?.status && <p className="tooltip-status">&quot;{ens?.records?.status}&quot;</p>}
        <div className="tooltip-bio">
          {showBio &&
            (isDetailsLoading ? (
              <div className="bio-loading">
                <LoadingCell height="18px" width="210px" />
                <LoadingCell height="18px" width="140px" />
              </div>
            ) : (
              <Bio
                description={ens?.records?.description}
                maxLines={2}
                showMore={false}
                onBioLinkClick={onBioLinkClick}
              />
            ))}
        </div>
        {showSocials && (
          <ProfileSocials
            records={ens?.records}
            name={ens?.name}
            userAddress={address}
            isLoading={isDetailsLoading}
            showEmptySocials={showEmptySocials}
            hideSocials={extraOptions?.hideSocials}
          />
        )}
        {includeGrails && <GrailsProfileSection addressOrName={addressOrName} />}
      </div>
    </div>
  )
}

export default ProfileTooltipCard
