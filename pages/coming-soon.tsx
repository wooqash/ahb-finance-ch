import { getComingSoonPageContent } from "@/lib/api";
import { RECAPTCHA_PUBLIC_KEY } from "@/lib/constants";
import { GetStaticProps } from "next";
import Head from "next/head";

import React, { useState, MouseEvent } from "react";
import ReactMarkdown from "react-markdown";
import AriaModal from "react-aria-modal";

import { ComingSoonPageData } from "types/coming-soon-page-data";

import Button from "@/components/button";
import Container from "@/components/container";
import LangSwitcher from "@/components/lang-switcher";
import LayoutShort from "@/components/layout-short";
import MainLogo from "@/components/main-logo";
import Modal from "@/components/Modal/modal";
import ModalHeader from "@/components/Modal/modal-header";
import ModalTitle from "@/components/Modal/modal-title";
import ModalContent from "@/components/Modal/modal-content";
import ModalNewsletter from "@/components/Modal/contents/modal-newsletter";
import ShareButtons from "@/components/share-buttons";
import Spinner from "@/components/spinner";

import rmStyles from "@/components/markdown-styles.module.scss";

type ComingSoonProps = {
  content: ComingSoonPageData;
  preview: boolean | null;
  showCookiePolicy?: (e: MouseEvent<HTMLElement>) => void;
};

const ComingSoon: React.FC<ComingSoonProps> = ({
  content,
  preview,
  showCookiePolicy,
}) => {
  const { openDialogButtonLabel, seo, dialog } = content?.comingSoon;
  const mainContent = content?.comingSoon?.content;
  const { logo, siteName, form } = content?.global;
  const metaTitle = seo?.metaTitle;
  const metaDescription = seo?.metaDescription;
  const mainLogo = logo && logo.length > 0 ? logo[0] : null;
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [modalHasEntered, setModalHasEntered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const activateModal = () => {
    setModalActive(true);
  };

  const onModalEnter = () => {
    setModalHasEntered(true);
  };

  const deactivateModal = () => {
    setModalHasEntered(false);
    (() => {
      setTimeout(() => {
        setModalActive(false);
      }, 1000);
    })();
  };

  const getApplicationNode = () => {
    const app = document.getElementById("App");
    if (!app) {
      throw new Error("App not found!");
    }
    return app;
  };

  const onLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return (
    <>
      <LayoutShort
        preview={preview}
        globalSettings={content?.global}
        showCookiePolicy={showCookiePolicy}
      >
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
          <script src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_PUBLIC_KEY}`}></script>
        </Head>
        <Container>
          <LangSwitcher />
          {mainLogo && <MainLogo logo={mainLogo} />}
          <div className="mx-auto my-10 lg:max-w-4xl">
            {mainContent && (
              <ReactMarkdown className={`${rmStyles.markdown}`}>
                {mainContent}
              </ReactMarkdown>
            )}
            {openDialogButtonLabel && (
              <Button
                onClick={activateModal}
                variant="contained"
                className="my-10"
              >
                {openDialogButtonLabel}
              </Button>
            )}
          </div>
          <AriaModal
            mounted={modalActive}
            onEnter={onModalEnter}
            onExit={deactivateModal}
            titleText={dialog.title}
            initialFocus="#ModalCloseButton"
            getApplicationNode={getApplicationNode}
            includeDefaultStyles={false}
          >
            <Modal
              isActive={modalHasEntered}
              id="CookieConsentModal"
              onClose={deactivateModal}
            >
              <ModalHeader onClose={deactivateModal}>
                {dialog.title && (
                  <ModalTitle className="my-0" id="NewsletterTitle">
                    {dialog.title}
                  </ModalTitle>
                )}
              </ModalHeader>
              <ModalContent>
                <ModalNewsletter
                  content={dialog}
                  form={form}
                  logo={mainLogo}
                  onLoading={onLoading}
                ></ModalNewsletter>
              </ModalContent>
            </Modal>
          </AriaModal>
          {/* <ShareButtons /> */}
          {loading && <Spinner />}
        </Container>
      </LayoutShort>
    </>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => {

//   // const slugs = ['kommt-bald', 'coming-soon', 'strona-w-budowie'];
//   // const paths = context.locales?.reduce((acc, curr, idx, arr) => {
//   //   return {params: { slug: [], locale: acc}}
//   // });

//   return {
//     paths: [
//       { params: { locale: 'de-CH'} },
//       { params: { locale: 'en'} }, // See the "paths" section below
//       { params: { locale: 'pl'} } // See the "paths" section below
//     ],
//     fallback: false // See the "fallback" section below
//   };
// }

export const getStaticProps: GetStaticProps = async (context) => {
  const { preview = null, locale } = context;
  const content = await getComingSoonPageContent(locale);
  if (!content) {
    throw new Error("No content");
  }
  return {
    props: { content, preview },
  };
};

export default ComingSoon;
