import { ExtendedPageContextData } from 'types/page-context-data'
import { getPageById } from './api';

export async function getLocalizedPage(targetLocale: string, pageContext: ExtendedPageContextData) {
  if (!targetLocale || !pageContext) {
    return null;
  }

  const localization = pageContext.localizations.find(
    (localization) => localization.locale === targetLocale
  )

  if (!localization) {
    return null;
  }

  const localePage = await getPageById(localization.id)
  return localePage;
}

export function localizePath(page: ExtendedPageContextData) {
  const { locale, defaultLocale, slug } = page;

  if (locale === defaultLocale) {
    // The default locale is not prefixed
    return `/${slug}`;
  }

  // The slug should have a localePrefix
  return `/${locale}/${slug}`;
}

export function getLocalizedPaths(page: ExtendedPageContextData) {
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
