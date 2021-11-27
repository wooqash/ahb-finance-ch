import { getCustom404PageContent } from "@/lib/api";
import { GetStaticProps } from "next";
import Head from "next/head";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import AriaModal from "react-aria-modal";

import { Custom404PageData } from "types/custom-404-error-page-data";

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
import Spinner from "@/components/spinner";
import ShareButtons from "@/components/share-buttons";

import rmStyles from "@/components/markdown-styles.module.scss";

type Custom404Props = {
  content: Custom404PageData;
  preview: boolean | null;
};

const Custom404: React.FC<Custom404Props> = ({ content, preview }) => {
  const { openDialogButtonLabel, seo, dialog } = content?.custom404Page;
  const mainContent = content?.custom404Page?.content;
  const { logo, metaTitleSuffix, form } = content?.global;
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
    const app =  document.getElementById("App");
    if (!app) {
      throw new Error('App not found!');
    }
    return app;
  };

  const onLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return (
    <>
      <LayoutShort preview={preview} globalSettings={content?.global}>
        <Head>
          {metaTitle && (
            <title key={metaTitle}>
              {metaTitle ? metaTitle + " | " + metaTitleSuffix : metaTitleSuffix}
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

export const getStaticProps: GetStaticProps = async (context) => {
  const { preview = null, locale } = context;
  const content = await getCustom404PageContent(locale);
  if (!content) {
    throw new Error("No content");
  }
  return {
    props: { content, preview },
  };
};

export default Custom404;
