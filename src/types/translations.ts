export type TranslationKey =
  // Common
  | 'connect'
  | 'disconnect'
  | 'loading'
  | 'error'
  | 'success'
  | 'save'
  | 'cancel'
  | 'confirm'
  | 'close'
  | 'viewAll'
  | 'noData'
  | 'retry'
  | 'goBack'
  | 'backToTop'
  | 'search placeholder'
  // Sign in with Ethereum
  | 'signInWithEthereum'
  | 'signingMessage'
  | 'signIn'
  | 'singingIn'
  // Profile
  | 'profile.editProfile'
  | 'profile.noUser'
  | 'profile.noBio'
  | 'profile.showMore'
  | 'profile.showLess'

export type TranslationFunction = (key: TranslationKey, fallback?: string) => string

export type LanguageCode = string // e.g., 'en', 'fr', 'es', 'de', etc.

export type TranslationObject = Partial<Record<TranslationKey, string>>

export type TranslationsMap = Record<LanguageCode, TranslationObject>

export interface TranslationConfig {
  translateFn?: TranslationFunction
  translations?: TranslationsMap
  translationsFromJSON?: TranslationsMap
  activeLanguage?: LanguageCode
  fallbackLanguage?: LanguageCode
}
