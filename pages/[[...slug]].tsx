import { GetStaticPaths, GetStaticPathsContext, GetStaticProps } from "next";
import ErrorPage from "next/error";
import { useRouter } from "next/router";

import { ExtendedPageContextData, PageContextData } from "types/page-context-data";
import { getLocalizedPaths } from "utils/localize";
import { SectionsData } from "types/sections-data";
import { SeoData } from "types/seo-data";
import { GlobalData } from "types/global-data";
import { LocalizedPathsData } from "types/localized-paths-data";
import { getPageData, getGlobalData, getAllPages, getPageSlugs, getAllArticles } from "utils/api";

import Layout from "@/components/layout";
import Seo from "@/components/seo";
import Sections from "@/components/sections";
import { ArticleData } from "types/blog-data";

type DynamicPageData = {
  preview: boolean | null;
  sections: SectionsData[];
  seo: SeoData;
  articles: ArticleData[];
  global: GlobalData;
  pageContext: ExtendedPageContextData;
};

const DynamicPage: React.FC<DynamicPageData> = ({
  sections,
  seo,
  articles,
  preview,
  global,
  pageContext,
}) => {
  const router = useRouter();

  // Check if the required data was provided
  if (!router.isFallback && !sections?.length) {
    return <ErrorPage statusCode={404} />;
  }

  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className="container">Loading...</div>;
  }

  console.log(global);
  
  // console.log(sections, seo, preview, global, pageContext);

  return (
      <Layout pageContext={pageContext} global={global}>
        <Seo seo={seo} pageContext={pageContext} />
        {/* <Sections sections={sections} preview={preview} articles={articles} form={global.form} /> */}
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
      </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (
  context: GetStaticPathsContext
) => {
  // Get all pages from Strapi
  const allPages = context.locales?.map(async (locale) => {
    const localePages = await getAllPages(locale);
    return localePages;
  });


  if (!allPages) {
    throw new Error("Pages are not found");
  }

  const pages = await (await Promise.all(allPages)).flat();

  const paths = pages.map((page) => {
    // Decompose the slug that was saved in Strapi
    const slugArray = !page?.slug ? undefined : page.slug.split("/");

    return {
      params: { slug: slugArray, title: page?.title },
      // Specify the locale to render
      locale: page?.locale,
    };
  });

  return { paths, fallback: true };

};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params, locale, locales, defaultLocale, preview = null } = context;

  const globalLocale = await getGlobalData(locale);

  const pageData = await getPageData(
    { slug: !params?.slug ? [""] : params.slug },
    locale,
    preview
  );

  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} };
  }

  const { contentSections, seo, localizations, slug } = pageData;

  const otherLocalizationPages = await getPageSlugs(pageData, preview);

  const articles = await getAllArticles(locale);

  const slugs = otherLocalizationPages.map((page) => {
      return {
          locale: page?.locale,
          slug: page?.slug,
      }
  });

  const pageContext: PageContextData = {
    locale: pageData.locale,
    locales,
    defaultLocale,
    slug,
    slugs,
    localizations,
  };

  const localizedPaths: LocalizedPathsData[] | null = getLocalizedPaths(pageContext);

  return {
    props: {
      preview,
      seo,
      sections: contentSections,
      articles,
      global: globalLocale,
      pageContext: {
        ...pageContext,
        localizedPaths, 
      },
    },
  };
};

export default DynamicPage;
