import Button from "@/components/button";
import { CookieInfoData } from "types/cookie-info-data";
import ReactMarkdown from "react-markdown";
import rmStyles from "@/components/markdown-styles.module.scss";
import { MouseEvent } from 'react';

type CookieBannerProps = {
    content: Pick<CookieInfoData, "cookieBannerText" | "settingsButtonLabel" | "acceptButtonLabel">;
    onAcceptAllCookies?: () => void;
    onActivateModal?: (e: MouseEvent) => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({content, onAcceptAllCookies, onActivateModal }) => {
  const { cookieBannerText, settingsButtonLabel, acceptButtonLabel } = content;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-5 bg-white text-primary">
      <ReactMarkdown className={`${rmStyles.markdown}`}>{cookieBannerText}</ReactMarkdown>
      <Button id="ConsentSettings" onClick={onActivateModal} className="mr-5 mb-5 lg:mb-0">
        {settingsButtonLabel}
      </Button>
      <Button id="ConsentAccept" onClick={onAcceptAllCookies}>
        {acceptButtonLabel}
      </Button>      
    </div>
  );
};

export default CookieBanner;
