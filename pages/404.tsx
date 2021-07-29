import { getCustom404PageContent } from "@/lib/api";
import { GetStaticProps } from "next";
import { Custom404PageData } from "types/custom-404-error-page-data";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import Container from "@/components/container";
import LayoutShort from "@/components/layout-short";
import LangSwitcher from "@/components/lang-switcher";
import MainLogo from "@/components/main-logo";
import ShareButtons from "@/components/share-buttons";
import AriaModal from "react-aria-modal";
import Button from "@/components/button";
import Modal from "@/components/modal";
import { useState } from "react";
import rmStyles from "@/components/markdown-styles.module.scss";

type Custom404Props = {
  content: Custom404PageData;
  preview: boolean | null;
};

const Custom404: React.FC<Custom404Props> = ({ content, preview }) => {
  const { openDialogButtonLabel, seo, dialog } = content?.custom404Page;
  const mainContent = content?.custom404Page?.content;
  const { logo, siteName, form } = content?.global;
  const metaTitle = seo?.metaTitle;
  const metaDescription = seo?.metaDescription;
  const mainLogo = logo && logo.length > 0 ? logo[0] : null;
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [modalHasEntered, setModalHasEntered] = useState<boolean>(false);

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
        console.log('inside ', modalActive)
      }, 300);
    })();
  };

  const getApplicationNode = () => {
    const app =  document.getElementById("App");
    if (!app) {
      throw new Error('App not found!');
    }
    return app;
  };

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
              onClose={deactivateModal}
              id="Newsletter"
              content={dialog}
              form={form}
              logo={mainLogo}
              isActive={modalHasEntered}
            ></Modal>
          </AriaModal>
          {/* <ShareButtons /> */}
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
