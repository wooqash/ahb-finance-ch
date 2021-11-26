import { PageContextData } from 'types/page-context-data'
// import { fetchAPI } from './api'

// export async function getLocalizedPage(targetLocale, pageContext) {
//   const localization = pageContext.localizations.find(
//     (localization) => localization.locale === targetLocale
//   )
//   const localePage = await fetchAPI(`/pages/${localization.id}`)
//   return localePage
// }

export function localizePath(page: PageContextData) {
  const { locale, defaultLocale, slug } = page;

  if (locale === defaultLocale) {
    // The default locale is not prefixed
    return `/${slug}`;
  }

  // The slug should have a localePrefix
  return `/${locale}/${slug}`;
}

export function getLocalizedPaths(page: PageContextData) {
  if (!page || !page.locales) {
    return null;
  }
  
  const paths = page.locales.map((locale) => {
    return {
      locale: locale,
      href: localizePath({ ...page, locale }),
    }
  });

  return paths;
}
