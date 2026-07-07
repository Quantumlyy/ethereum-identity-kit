import React from 'react'
import { clsx } from 'clsx'
import { useProfileDetails } from '../../../hooks/'
import { useTranslation } from '../../../context/TranslationContext'
import { beautifyEnsName, truncateAddress } from '../../../utils'
import { ENS } from '../../icons'
import Bio from './components/bio'
import Avatar from '../../molecules/avatar/Avatar'
import HeaderImage from './components/HeaderImage'
import LoadingCell from '../../atoms/loading-cell/LoadingCell'
import CardHeader from './components/card-header/CardHeader'
import ProfileSocials from '../../molecules/profile-socials/ProfileSocials'
import { DEFAULT_FALLBACK_AVATAR } from '../../../constants'
import { ProfileCardProps } from './ProfileCard.types'
import './ProfileCard.css'

/**
 * Profile Card for an Ethereum Profile. Displays ENS identity data in any Web3 app.
 *
 * @param addressOrName - Ethereum Address or ENS name to fetch profile data for (required)
 *
 * @param connectedAddress - Address of the user connected to the app (optional)
 *
 * @param darkMode - (optional)
 *
 * @param options - see ProfileExtraOptions type for all options (optional)
 *
 * @param className - string (optional)
 *
 * @param style - CSS Properties (optional)
 *
 * @param props - HTML div element props (optional)
 *
 * @returns ProfileCard component
 */
const ProfileCard: React.FC<ProfileCardProps> = ({
  addressOrName,
  connectedAddress,
  darkMode,
  showEmptySocials,
  onProfileClick,
  extraOptions,
  className,
  style,
  ...props
}) => {
  const { t } = useTranslation()

  const { prefetched, nameMenu, onEditProfileClick, onBioLinkClick } = extraOptions || {}

  const { profile } = prefetched || {}

  const { ens, address, detailsLoading, refreshProfileDetails } = useProfileDetails({
    addressOrName,
    prefetchedData: profile?.data,
    refetchPrefetchedData: profile?.refetch,
  })
  const isDetailsLoading = profile?.isLoading ?? detailsLoading

  const isConnectedUserCard = connectedAddress && address && address?.toLowerCase() === connectedAddress?.toLowerCase()

  return (
    <div
      className={clsx('profile-card', darkMode && 'dark dark-profile-card', className)}
      data-testid="profile-card"
      style={{ fontFamily: 'Inter, sans-serif', ...style }}
      {...props}
    >
      <HeaderImage
        src={ens?.records?.header}
        name={ens?.name}
        isLoading={isDetailsLoading}
        style={{ borderTopLeftRadius: style?.borderRadius, borderTopRightRadius: style?.borderRadius }}
      />
      <CardHeader
        refetchData={() => {
          refreshProfileDetails()
        }}
        nameMenu={nameMenu}
      />
      <div className="profile-card-details">
        <div className="profile-avatar-container">
          {isDetailsLoading ? (
            <LoadingCell height="100px" width="100px" radius="50%" />
          ) : (
            <Avatar
              address={addressOrName}
              src={ens?.avatar}
              name={ens?.name}
              fallback={DEFAULT_FALLBACK_AVATAR}
              style={{ width: '100px', height: '100px' }}
              onClick={() => onProfileClick?.(addressOrName)}
            />
          )}
          {isConnectedUserCard ? (
            <a
              href={`https://app.ens.domains/${ens?.name}`}
              target="_blank"
              rel="noreferrer"
              className="user-profile-edit-profile-button-container"
              onClick={(e) => {
                if (onEditProfileClick) {
                  e.preventDefault()
                  onEditProfileClick()
                }
              }}
            >
              <button className="user-profile-edit-profile-button">
                <ENS height={20} width={20} />
                <p>{t('profile.editProfile')}</p>
              </button>
            </a>
          ) : null}
        </div>
        {isDetailsLoading ? (
          <LoadingCell height="26px" width="160px" />
        ) : (
          <div className="profile-name-container">
            <p
              className="profile-name"
              enable-hover={!!onProfileClick ? 'true' : 'false'}
              onClick={() => onProfileClick?.(addressOrName)}
            >
              {ens?.name ? beautifyEnsName(ens.name) : address ? truncateAddress(address) : addressOrName}
            </p>
          </div>
        )}
        {ens?.records?.status && <p className="profile-status">&quot;{ens?.records?.status}&quot;</p>}
        <div className="profile-bio">
          {isDetailsLoading ? (
            <div className="profile-bio-loading">
              <LoadingCell height="18px" width="210px" />
              <LoadingCell height="18px" width="140px" />
            </div>
          ) : (
            <Bio description={ens?.records?.description} onBioLinkClick={onBioLinkClick} />
          )}
          <ProfileSocials
            records={ens?.records}
            name={ens?.name}
            userAddress={address}
            isLoading={isDetailsLoading}
            includeUrls={true}
            darkMode={darkMode}
            showEmptySocials={showEmptySocials}
            hideSocials={extraOptions?.hideSocials}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
