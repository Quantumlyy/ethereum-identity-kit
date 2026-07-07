export const GRAILS_API_URL = 'https://api.grails.app/api/v1'
export const ENS_METADATA_URL = 'https://metadata.ethid.org'
// Neutral inline fallbacks (no external asset host / no third-party dependency)
export const DEFAULT_FALLBACK_AVATAR =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='%23cccccc'/></svg>"
export const DEFAULT_FALLBACK_HEADER =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='340' height='120'><rect width='340' height='120' fill='%23cccccc'/></svg>"

export const DEFAULT_LOADING_GRADIENT =
  'linear-gradient(90deg, rgba(200, 200, 200, 0.7) 0%, rgba(172, 172, 172, 0.05) 50%, rgba(200, 200, 200, 0.7) 100%)'
export const LIGHT_LOADING_GRADIENT =
  'linear-gradient(90deg, rgba(212, 212, 212, 0.9) 0%, rgba(132, 132, 132, 0.2) 50%, rgba(212, 212, 212, 0.9) 100%)'

export const THEMES = ['light', 'dark'] as const

export const FETCH_LIMIT = 20

export * from './abi'
export * from './time'
export * from './chains'
export * from './socials'
export * from './records'
export * from './contracts'
export * from './transports'
export * from './translations'
