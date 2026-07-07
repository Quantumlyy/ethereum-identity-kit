import clsx from 'clsx'
import { useTranslation } from '../../../context'
import { useProfileDetails } from '../../../hooks/profile/useProfileDetails'
import { beautifyEnsName, truncateAddress, validateEnsHeader } from '../../../utils'
import { ENS } from '../../icons'
import Avatar from '../../molecules/avatar/Avatar'
import Loading from './components/loading'
import Bio from '../profile-card/components/bio'
import MoreOptions from './components/more-options'
import ProfileCard from '../profile-card/ProfileCard'
import ProfileSocials from '../../molecules/profile-socials/ProfileSocials'
import ImageWithFallback from '../../atoms/image-with-fallback/ImageWithFallback'
import { DEFAULT_FALLBACK_HEADER } from '../../../constants'
import { FullWidthProfileProps } from './FullWidthProfile.types'
import './FullWidthProfile.css'

/**
 * Full Width Profile for any Ethereum Profile. Displays ENS identity data in any Web3 app.
 *
 * @param addressOrName - Ethereum Address or ENS name to fetch profile data for (required)
 *
 * @param connectedAddress - Address of the user connected to the app (optional)
 *
 * @param darkMode - (optional)
 *
 * @param role - can be used to add any additional information to the profile (used to display roles on https://ethid.org) (optional)
 *
 * @param onProfileClick - action to be performed when the profile is clicked (optional)
 *
 * @param alignProfileContent - can be used to align the profile content when max-width is surpassed (center, start, end) (optional)
 *
 * @param extraOptions - see ProfileExtraOptions type for all options (optional)
 *
 * @param className - string (optional)
 *
 * @param style - CSS Properties (optional)
 *
 * @returns ProfileCard component
 */
const FullWidthProfile: React.FC<FullWidthProfileProps> = ({
  addressOrName,
  connectedAddress,
  darkMode,
  className,
  extraOptions,
  showEmptySocials,
  onProfileClick,
  style,
  alignProfileContent = 'center',
}) => {
  const { role, nameMenu, prefetched, onEditProfileClick, onBioLinkClick } = extraOptions || {}

  const { profile } = prefetched || {}

  const { t } = useTranslation()

  const { ens, address, detailsLoading, refreshProfileDetails } = useProfileDetails({
    addressOrName,
    prefetchedData: profile?.data,
    refetchPrefetchedData: profile?.refetch,
  })
  const isDetailsLoading = profile?.isLoading || detailsLoading

  const isConnectedUserCard = connectedAddress && address && address?.toLowerCase() === connectedAddress?.toLowerCase()

  return (
    <>
      <div className="user-profile-card-container">
        <ProfileCard
          addressOrName={addressOrName}
          connectedAddress={connectedAddress}
          darkMode={darkMode}
          onProfileClick={onProfileClick}
          showEmptySocials={showEmptySocials}
          extraOptions={extraOptions}
          style={{
            width: '100%',
            borderRadius: '0px',
            ...style,
          }}
        />
      </div>
      <div className="full-width-profile-container">
        {isDetailsLoading ? (
          <Loading darkMode={darkMode} style={style} />
        ) : address ? (
          <div
            className={clsx('user-profile-container', darkMode && 'dark')}
            style={{ alignItems: alignProfileContent }}
          >
            <div
              id="user-profile"
              className={clsx('user-profile', className)}
              style={{
                ...style,
              }}
            >
              <div className="user-profile-header-container">
                <ImageWithFallback
                  src={validateEnsHeader(ens?.records?.header, ens?.name)}
                  fallback={DEFAULT_FALLBACK_HEADER}
                  alt="Profile Summary Card"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.2,
                  }}
                />
              </div>
              {role && <p className="user-profile-role">{role}</p>}
              <MoreOptions
                nameMenu={nameMenu}
                refetchData={() => {
                  refreshProfileDetails()
                }}
              />
              <div
                className={clsx('user-profile-status-container', role && 'has-role')}
                style={{
                  bottom: `${(typeof style?.paddingBottom === 'string' ? Number(style.paddingBottom.slice(0, -2)) : Number(style?.paddingBottom || 0)) + 24}px`,
                }}
              >
                {ens?.records?.status && (
                  <p className="user-profile-status-desktop">&quot;{ens.records.status}&quot;</p>
                )}
              </div>
              <div className="user-profile-content">
                <div onClick={() => onProfileClick?.(address)} className="user-profile-avatar-container">
                  <Avatar src={ens?.avatar} name={ens?.name || address} className="user-profile-avatar-container" />
                </div>
                <div className="user-profile-details">
                  <div className="user-profile-name-container">
                    <p className="user-profile-name" onClick={() => onProfileClick?.(address)}>
                      {ens?.name ? beautifyEnsName(ens?.name) : truncateAddress(address)}
                    </p>
                    {isConnectedUserCard ? (
                      <a
                        href={`https://app.ens.domains/${ens?.name || address}`}
                        target="_blank"
                        rel="noreferrer"
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
                  {ens?.records?.status && (
                    <p className="user-profile-status-mobile">&quot;{ens.records.status}&quot;</p>
                  )}
                  <div className="user-profile-bio-container">
                    <Bio
                      description={ens?.records?.description}
                      fontSize={18}
                      maxLines={5}
                      onBioLinkClick={onBioLinkClick}
                    />
                  </div>
                  <ProfileSocials
                    userAddress={address}
                    records={ens?.records}
                    name={ens?.name}
                    includeUrls={true}
                    style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: '16px' }}
                    showEmptySocials={showEmptySocials}
                    hideSocials={extraOptions?.hideSocials}
                  />
                </div>
              </div>
            </div>
            <div className="user-profile-header-container-ultra-wide">
              <ImageWithFallback
                src={validateEnsHeader(ens?.records?.header, ens?.name)}
                fallback={DEFAULT_FALLBACK_HEADER}
                alt="Profile Summary Card"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.2,
                }}
              />
            </div>
          </div>
        ) : (
          <div className={clsx('user-profile-error-container', darkMode && 'dark')}>
            <p className="user-profile-error-text">{t('profile.noUser')}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default FullWidthProfile
