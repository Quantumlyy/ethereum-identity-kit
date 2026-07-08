import { createPublicClient } from 'viem'
import { resolveEnsProfile } from './resolve-ens-profile'

// Stub the viem surface the resolver uses (real isAddress via a regex, mocked
// network client) plus the ESM-only deps it pulls in transitively, so these
// tests exercise the resolver's logic without an RPC or ESM transform config.
jest.mock('viem', () => ({
  __esModule: true,
  createPublicClient: jest.fn(),
  isAddress: (value: string) => /^0x[0-9a-fA-F]{40}$/.test(value),
}))
jest.mock('viem/chains', () => ({ mainnet: { id: 1 } }))
jest.mock('../../constants/transports', () => ({ transports: {} }))
jest.mock('../ens', () => ({ normalizeEnsName: (name: string) => name }))

const mockedCreate = createPublicClient as unknown as jest.Mock

type FakeClient = {
  name?: string | null
  address?: `0x${string}` | null
  avatar?: string | null
  texts?: Record<string, string>
}

const stubClient = ({ name = null, address = null, avatar = null, texts = {} }: FakeClient) => ({
  getEnsName: jest.fn(async () => name),
  getEnsAddress: jest.fn(async () => address),
  getEnsAvatar: jest.fn(async () => avatar),
  getEnsText: jest.fn(async ({ key }: { key: string }) => texts[key] ?? null),
})

describe('resolveEnsProfile (client-side viem ENS resolution)', () => {
  beforeEach(() => jest.clearAllMocks())

  it('resolves a forward ENS name to an address, avatar, header and text records', async () => {
    mockedCreate.mockReturnValue(
      stubClient({
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        avatar: 'https://euc.li/vitalik.eth',
        texts: { description: 'hello', 'com.twitter': 'VitalikButerin', header: 'https://h.example/banner' },
      })
    )

    const result = await resolveEnsProfile('vitalik.eth')

    expect(result).not.toBeNull()
    expect(result?.address).toBe('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')
    expect(result?.name).toBe('vitalik.eth')
    expect(result?.avatar).toBe('https://euc.li/vitalik.eth')
    expect(result?.header).toBe('https://h.example/banner')
    expect(result?.records.description).toBe('hello')
    expect(result?.records['com.twitter']).toBe('VitalikButerin')
  })

  it('reverse-resolves an address input to its primary ENS name', async () => {
    mockedCreate.mockReturnValue(stubClient({ name: 'vitalik.eth', avatar: 'a', texts: { description: 'd' } }))

    const result = await resolveEnsProfile('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')

    expect(result?.name).toBe('vitalik.eth')
    expect(result?.address).toBe('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')
    expect(result?.records.description).toBe('d')
  })

  it('returns null for a name that does not forward-resolve (drives the "no user" state)', async () => {
    mockedCreate.mockReturnValue(stubClient({ address: null }))

    const result = await resolveEnsProfile('does-not-exist-zzz.eth')

    expect(result).toBeNull()
  })

  it('preserves a valid address that has no primary name (name stays null, not a placeholder)', async () => {
    mockedCreate.mockReturnValue(stubClient({ name: null }))

    const result = await resolveEnsProfile('0x1111111111111111111111111111111111111111')

    expect(result).not.toBeNull()
    expect(result?.address).toBe('0x1111111111111111111111111111111111111111')
    expect(result?.name).toBeNull()
    expect(result?.records).toEqual({})
  })
})
