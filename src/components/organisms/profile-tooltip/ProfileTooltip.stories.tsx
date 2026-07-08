import { StoryFn, Meta } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProfileTooltip from './ProfileTooltip'
import { Address } from '../../../types'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '../../../constants/wagmi'
import { ProfileTooltipWrapperProps } from './ProfileTooltip.types'

const queryClient = new QueryClient()

const onProfileClick = (addressOrName: Address | string) => {
  alert(addressOrName)
}

export default {
  title: 'Organisms/Profile Tooltip',
  component: ProfileTooltip,
  argTypes: {
    horizontalPlacement: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{Story()}</WagmiProvider>
      </QueryClientProvider>
    ),
  ],
} as Meta<typeof ProfileTooltip>

interface TemplateProps extends ProfileTooltipWrapperProps {
  paddingTop?: number
}

const Template: StoryFn<TemplateProps> = (args) => (
  <div
    style={{ padding: '24px', paddingTop: args.paddingTop || '24px', backgroundColor: '#CCCCCC', minHeight: '400px' }}
  >
    <ProfileTooltip {...args}>
      <button style={{ padding: '10px 20px', cursor: 'pointer' }}>Hover me to see profile</button>
    </ProfileTooltip>
  </div>
)

export const AddressDefaultPosition = Template.bind({})
AddressDefaultPosition.args = {
  addressOrName: '0x983110309620d911731ac0932219af06091b6744',
  connectedAddress: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  showSocials: true,
  showBio: true,
  showStatus: true,
  darkMode: false,
  verticalOffset: 8,
  horizontalOffset: 0,
  onProfileClick,
  keepTooltipOnHover: false,
  boundary: 'scrollParent',
}

export const ENSTopPosition = Template.bind({})
ENSTopPosition.args = {
  addressOrName: 'encrypteddegen.eth',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
  paddingTop: 240,
  darkMode: false,
  verticalOffset: 8,
  horizontalOffset: 0,
  onProfileClick,
}

export const LeftTopAlignedWithArrow = Template.bind({})
LeftTopAlignedWithArrow.args = {
  addressOrName: 'encrypteddegen.eth',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
  horizontalPlacement: 'left',
  paddingTop: 240,
  showArrow: true,
  verticalOffset: 8,
  horizontalOffset: 0,
  onProfileClick,
}

export const InlineText = Template.bind({})
InlineText.args = {
  ...AddressDefaultPosition.args,
  inline: true,
  children: (
    <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Hover this inline text</span>
  ),
}

export const IncludeGrailsData = Template.bind({})
IncludeGrailsData.args = {
  ...AddressDefaultPosition.args,
  addressOrName: 'vitalik.eth',
  includeGrails: true,
}
