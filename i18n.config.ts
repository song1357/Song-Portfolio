export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'zh']
} as const

export const getDisplayName = (locale: string): string => {
  switch (locale) {
    case 'en':
      return 'English';
    case 'zh':
      return '中文';
    default:
      return locale;
  }
};

export type Locale = (typeof i18n)['locales'][number]
