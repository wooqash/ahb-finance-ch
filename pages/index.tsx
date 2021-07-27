import Container from "@/components/container";
import LayoutShort from "@/components/layout-short";
import LangSwitcher from "@/components/lang-switcher";
import MainLogo from "@/components/main-logo";
import { getLocalizationPageContent } from "@/lib/api";
import Head from "next/head";
import { GetStaticProps } from "next";
import { LocalizationPageData } from "types/localization-page-data";
import LocalizationPageContent from '@/components/localization-page-content';
import ShareButtons from "@/components/share-buttons";

type IndexProps = {
  content: LocalizationPageData;
  preview: boolean | null;
};

const Index: React.FC<IndexProps> = ({ content, preview }) => {
  const { mainText, chButton, ukButton, seo } = content?.localizationPage;
  const { logo, siteName } = content?.global;
  const metaTitle = seo?.metaTitle;
  const metaDescription = seo?.metaDescription;
  const mainLogo = logo && logo.length > 0 ? logo[0] : null;
  return (
    <>
      <LayoutShort preview={preview} globalSettings={content?.global}>
        <Head>
          {metaTitle && (
            <title key={metaTitle}>
              {metaTitle ? metaTitle + " | " + siteName : siteName}
            </title>
          )}
          {metaDescription && (
            <meta
              key={metaDescription}
              name="description"
              content={metaDescription}
            />
          )}
        </Head>
        <Container>
          <LangSwitcher />
          {mainLogo && <MainLogo logo={mainLogo} />}
          {mainText && chButton && ukButton && <LocalizationPageContent text={mainText} buttons={[chButton, ukButton]} />}
          {/* <ShareButtons /> */}
        </Container>
      </LayoutShort>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { preview = null, locale } = context;
  const content = await getLocalizationPageContent(locale);
  if (!content) {
    throw new Error("No content");
  }
  return {
    props: { content, preview },
  };
};

export default Index;
