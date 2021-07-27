import { getComingSoonPageContent } from "@/lib/api";
import { GetStaticProps } from "next";
import { ComingSoonPageData } from "types/coming-soon-page-data";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import Container from "@/components/container";
import LayoutShort from "@/components/layout-short";
import LangSwitcher from "@/components/lang-switcher";
import MainLogo from "@/components/main-logo";
import ShareButtons from "@/components/share-buttons";
import Button from "@/components/button";
import Dialog from "@/components/dialog";
import { useState } from "react";
import rmStyles from '@/components/markdown-styles.module.scss';

import { MouseEvent, TransitionEvent, KeyboardEvent } from "react";

type ComingSoonProps = {
    content: ComingSoonPageData;
    preview: boolean | null;
}
 
const ComingSoon:React.FC<ComingSoonProps> = ({ content, preview }) => {
    const { openDialogButtonLabel, seo, dialog } = content?.comingSoon;
    const mainContent = content?.comingSoon?.content;
    const { logo, siteName, form } = content?.global;
    const metaTitle = seo?.metaTitle;
    const metaDescription = seo?.metaDescription;
    const mainLogo = logo && logo.length > 0 ? logo[0] : null;
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const handleOpenDialog = (e: MouseEvent): void => {
      setOpenDialog(true);
      document.body.classList.toggle("dialog--active");
    };

    const handleCloseDialog = (e: MouseEvent): void => {
      setOpenDialog(false);
      document.body.classList.toggle("dialog--active");
    };
  
    const handleEscButton = (e: KeyboardEvent): void => {
      const isEscape = e.key === "Escape" || e.key === "Esc";
      if (isEscape && document.body.classList.contains("dialog--active")) {
        setOpenDialog(false);
        document.body.classList.toggle("dialog--active");
      }
    };
  
    const handleTransitionEnd = (e: TransitionEvent): void => {
      const dialog = e.target as HTMLElement;
      if (dialog) {
        const input = dialog.querySelector("input") as HTMLInputElement;
        if (input) {
          input.focus();
        }
      }
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
                    {mainContent && <ReactMarkdown className={`${rmStyles.markdown}`}>{mainContent}</ReactMarkdown>}
                    {openDialogButtonLabel && <Button onClick={handleOpenDialog} variant="contained" className="my-10">{openDialogButtonLabel}</Button>}
                </div>
                <Dialog
                    isOpen={openDialog}
                    onClose={handleCloseDialog}
                    onTransitionEnd={handleTransitionEnd}
                    onKeyDown={handleEscButton}
                    id="Newsletter"
                    ariaLabelledby="DialogTitle"
                    ariaDescribedby="DialogDescription"
                    content={dialog}
                    form={form}
                    logo={mainLogo}
                    ></Dialog>
                {/* <ShareButtons /> */}
                </Container>
            </LayoutShort>
        </>
    );
}
 
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