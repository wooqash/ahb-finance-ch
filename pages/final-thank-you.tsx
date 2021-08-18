import { MouseEvent } from "react";
import ReactMarkdown from "react-markdown";
import { getFinalThankYouPageContent } from "@/lib/api";
import { GetStaticProps } from "next";
import { FinalThankYouPageData } from "types/final-thank-you-page-data";
import Head from "next/head";
import { useRouter } from 'next/router';
import Container from "@/components/container";
import LayoutShort from "@/components/layout-short";
import LangSwitcher from "@/components/lang-switcher";
import MainLogo from "@/components/main-logo";
import ShareButtons from "@/components/share-buttons";
import Button from "@/components/button";

type FinalThankYouProps = {
  content: FinalThankYouPageData;
  preview: boolean | null;
  showCookiePolicy?: (e: MouseEvent<HTMLElement>) => void;
};

const FinalThankYou: React.FC<FinalThankYouProps> = ({ content, preview, showCookiePolicy }) => {
  const { seo } = content?.finalThankYouPage;
  const mainContent = content?.finalThankYouPage?.content;
  const { logo, siteName, backToMainPageButtonLabel } = content?.global;
  const metaTitle = seo?.metaTitle;
  const metaDescription = seo?.metaDescription;
  const mainLogo = logo && logo.length > 0 ? logo[0] : null;
  const {locale} = useRouter();

  return (
    <>
      <LayoutShort preview={preview} globalSettings={content?.global} showCookiePolicy={showCookiePolicy}>
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
          <div className="mx-auto my-10 lg:max-w-4xl">
            {mainContent && <ReactMarkdown>{mainContent}</ReactMarkdown>}
            {backToMainPageButtonLabel && <a href={`/${locale}`}><Button className="my-4">{backToMainPageButtonLabel}</Button></a>}
          </div>
          {/* <ShareButtons /> */}
        </Container>
      </LayoutShort>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { preview = null, locale } = context;
  const content = await getFinalThankYouPageContent(locale);
  if (!content) {
    throw new Error("No content");
  }
  return {
    props: { content, preview },
  };
};

export default FinalThankYou;
