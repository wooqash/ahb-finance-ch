import { MouseEvent } from "react";
import { getPrivacyPolicyPageContent } from "@/lib/api";
import { GetStaticProps } from "next";
import { PrivacyPolicyPageData } from "types/privacy-policy-page-data";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import Container from "@/components/container";
import LayoutClean from "@/components/layout-clean";
import LangSwitcher from "@/components/lang-switcher";
import MainLogo from "@/components/main-logo";
import ShareButtons from "@/components/share-buttons";
import rmStyles from '@/components/markdown-styles.module.scss';

type PrivacyPolicyProps = {
  content: PrivacyPolicyPageData;
  preview: boolean | null;
  showCookiePolicy?: (e: MouseEvent<HTMLElement>) => void;
};

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ content, preview, showCookiePolicy }) => {
  const { seo } = content?.privacyPolicyPage;
  const mainContent = content?.privacyPolicyPage?.content;
  const { logo, siteName } = content?.global;
  const metaTitle = seo?.metaTitle;
  const metaDescription = seo?.metaDescription;
  const mainLogo = logo && logo.length > 0 ? logo[0] : null;

  return (
    <>
      <LayoutClean preview={preview} globalSettings={content?.global} showCookiePolicy={showCookiePolicy}>
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
          <div className="mx-auto my-10 lg:max-w-6xl text-left">
            {mainContent && <ReactMarkdown className={`${rmStyles.markdown}`}>{mainContent}</ReactMarkdown>}
          </div>
          {/* <ShareButtons /> */}
        </Container>
      </LayoutClean>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { preview = null, locale } = context;
  const content = await getPrivacyPolicyPageContent(locale);
  if (!content) {
    throw new Error("No content");
  }
  return {
    props: { content, preview },
  };
};

export default PrivacyPolicy;
