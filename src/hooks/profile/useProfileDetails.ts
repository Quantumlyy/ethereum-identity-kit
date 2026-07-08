import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchProfileDetails } from '../../utils/api/fetch-profile-details'
import { Address, UseProfileDetailsReturn } from '../../types'
import { ProfileDetailsResponse } from '../../types/profile'

interface UseProfileDetailsProps {
  addressOrName: Address | string
  prefetchedData?: ProfileDetailsResponse
  refetchPrefetchedData?: () => void
}

export const useProfileDetails = ({
  addressOrName,
  prefetchedData,
  refetchPrefetchedData,
}: UseProfileDetailsProps): UseProfileDetailsReturn => {
  const [fetchFreshProfileDetails, setFetchFreshProfileDetails] = useState(false)
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['profile', addressOrName, fetchFreshProfileDetails, prefetchedData],
    queryFn: async () => prefetchedData || (await fetchProfileDetails(addressOrName)),
    refetchOnWindowFocus: false,
  })

  const refreshProfileDetails = () => {
    if (isRefetching) return

    if (refetchPrefetchedData) return refetchPrefetchedData()

    if (fetchFreshProfileDetails) refetch()
    else setFetchFreshProfileDetails(true)
  }

  const address = data?.address
  const ens = data?.ens
  const detailsLoading = isLoading || isRefetching

  return {
    ens,
    address,
    detailsLoading,
    refreshProfileDetails,
  }
}
