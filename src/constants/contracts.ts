import type { Address } from 'viem'

export const ENSContracts: {
  BaseRegistrar: Address
  Registry: Address
  PublicResolver: Address
} = {
  BaseRegistrar: '0x59E16fcCd424Cc24e280Be16E11Bcd56fb0CE547' as Address,
  Registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' as Address,
  PublicResolver: '0xF29100983E058B709F3D539b0c765937B804AC15' as Address,
} as const
