import { WagmiProvider } from 'wagmi'
import { StoryFn, Meta } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from '../../../constants/wagmi'
import { Address } from '../../../types/address'
import FullWidthProfile from './FullWidthProfile'

const queryClient = new QueryClient()

const onProfileClick = (addressOrName: Address | string) => {
  alert(addressOrName)
}

export default {
  title: 'Organisms/Full Width Profile',
  component: FullWidthProfile,
  argTypes: {
    addressOrName: {
      control: 'text',
      type: 'string',
    },
    alignProfileContent: {
      control: 'select',
      options: ['center', 'start', 'end'],
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <div style={{ padding: '0px', fontFamily: 'Inter, sans-serif' }}>{Story()}</div>
        </WagmiProvider>
      </QueryClientProvider>
    ),
  ],
} as Meta<typeof FullWidthProfile>

const Template: StoryFn<typeof FullWidthProfile> = (args) => <FullWidthProfile {...args} />

export const ByAddress = Template.bind({})
ByAddress.args = {
  addressOrName: '0x983110309620d911731ac0932219af06091b6744',
  darkMode: false,
  onProfileClick,
  connectedAddress: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  alignProfileContent: 'center',
  showEmptySocials: true,
}

export const ByENSName = Template.bind({})
ByENSName.args = {
  addressOrName: 'encrypteddegen.eth',
  darkMode: false,
  onProfileClick,
  style: {
    paddingBottom: '120px',
  },
  extraOptions: {
    role: 'Frontend developer',
    hideSocials: ['com.github'],
  },
  showEmptySocials: true,
}

export const PrefetchedData = Template.bind({})
PrefetchedData.args = {
  addressOrName: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  extraOptions: {
    prefetched: {
      profile: {
        data: {
          address: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
          ens: {
            name: 'encrypteddegen.eth',
            avatar: 'https://euc.li/encrypteddegen.eth',
            records: {
              avatar: 'https://euc.li/encrypteddegen.eth',
              'com.discord': 'encrypteddegen.eth',
              'com.github': 'encryptedDegen',
              'com.twitter': 'ZunecJan',
              description: 'UI/UX Designer & Developer | Building the web3 social graph',
              header: 'https://i.imgur.com/pWYMFBn.jpeg',
              'org.telegram': 'encrypteddegen',
              url: 'https://app.ens.domains',
            },
          },
        },
        isLoading: false,
        refetch: () => {},
      },
    },
  },
  onProfileClick,
  showEmptySocials: true,
}
