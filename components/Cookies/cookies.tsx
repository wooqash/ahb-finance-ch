import {
  useEffect,
  useState,
  ChangeEvent,
  MouseEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { useCookies } from "react-cookie";
import AriaModal from "react-aria-modal";

import { CookieInfoData } from "types/cookie-info-data";
import { CookieGroupsFlags } from "types/cookie-groups-flags";

import Button from '@/components/button';
import Modal from "@/components/Modal/modal";
import ModalHeader from "@/components/Modal/modal-header";
import ModalTitle from "@/components/Modal/modal-title";
import ModalContent from "@/components/Modal/modal-content";
import ModalFooter from "@/components/Modal/modal-footer";
import ModalCookieInfo from "@/components/Modal/contents/modal-cookie-info";
import CookieBanner from "@/components/Cookies/cookie-banner";

import usePrevious from "@/lib/usePrevious";
import dayjs from "dayjs";

type CookiesProps = {
  content: CookieInfoData;
  isActive: boolean;
  onActivateModal: (e: MouseEvent) => void;
  setModalActive: Dispatch<SetStateAction<boolean>>;
};

const Cookies: React.FC<CookiesProps> = ({
  content,
  isActive,
  onActivateModal,
  setModalActive,
}) => {
  const consentPropertyName = "COOKIE_CONSENT";
  const {
    settingsTitle,
    tabs,
    groups,
    acceptAllCookiesButtonLabel,
    acceptSelectedCookiesButtonLabel,
    acceptNecessaryCookiesButtonLabel,
    cookieBannerText,
    settingsButtonLabel,
    acceptButtonLabel,
  } = content;
  const defaultCookieConsents: CookieGroupsFlags = {
    necessary: true,
    preferences: false,
    stats: false,
    marketing: false,
    social: false,
    unclassified: false,
  };

  const [modalHasEntered, setModalHasEntered] = useState(false);
  const [cookieConsents, setCookieConsents] = useCookies([consentPropertyName]);
  const [cookieGroupConsents, setCookieGroupConsents] =
    useState<CookieGroupsFlags>(
      cookieConsents[consentPropertyName] || defaultCookieConsents
    );
  const prevCookieGroupConsents = usePrevious({ cookieGroupConsents });

  const acceptAllCookies = () => {
    setCookieGroupConsents({
      necessary: true,
      preferences: true,
      stats: true,
      marketing: true,
      social: true,
      unclassified: true,
    });
    deactivateModal();
  };

  const acceptNecessaryCookies = () => {
    setCookieGroupConsents({
      necessary: true,
      preferences: false,
      stats: false,
      marketing: false,
      social: false,
      unclassified: false,
    });
    deactivateModal();
  };

  const acceptSelectedCookies = () => {
    saveCookieConsent();
    deactivateModal();
  };

  const changeCookieConsents = (e: ChangeEvent<HTMLInputElement>) => {
    setCookieGroupConsents({
      ...cookieGroupConsents,
      [e.target.id]: e.target.checked,
    });
  };

  const saveCookieConsent = () => {
    const expireDate = dayjs().add(1, "year");
    setCookieConsents(consentPropertyName, cookieGroupConsents, {
      expires: new Date(
        expireDate.year(),
        expireDate.month(),
        expireDate.date()
      ),
    });
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

  useEffect(() => {
    if (
      prevCookieGroupConsents?.cookieGroupConsents &&
      prevCookieGroupConsents?.cookieGroupConsents !== cookieGroupConsents
    ) {
      saveCookieConsent();
    }
  }, [cookieGroupConsents]);

  return (
    <>
      {!cookieConsents[consentPropertyName] && content && (
        <CookieBanner
          content={{ cookieBannerText, settingsButtonLabel, acceptButtonLabel }}
          onAcceptAllCookies={acceptAllCookies}
          onActivateModal={onActivateModal}
        />
      )}
      <AriaModal
        mounted={isActive}
        onEnter={onModalEnter}
        onExit={deactivateModal}
        titleText={settingsTitle}
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
            {settingsTitle && (
              <ModalTitle className="my-0" id="NewsletterTitle">
                {settingsTitle}
              </ModalTitle>
            )}
          </ModalHeader>
          <ModalContent>
            <ModalCookieInfo
              content={{
                tabs,
                groups,
              }}
              consents={cookieGroupConsents}
              onHandleChange={changeCookieConsents}
            ></ModalCookieInfo>
          </ModalContent>
          <ModalFooter>
            <div className="flex flex-wrap justify-center">
              <Button
                id="AcceptAllCookies"
                onClick={acceptAllCookies}
                className="m-4"
              >
                {acceptAllCookiesButtonLabel}
              </Button>
              <Button
                id="AcceptSelectedCookies"
                onClick={acceptSelectedCookies}
                className="m-4"
              >
                {acceptSelectedCookiesButtonLabel}
              </Button>
              <Button
                id="AcceptNecessaryCookies"
                onClick={acceptNecessaryCookies}
                className="m-4"
              >
                {acceptNecessaryCookiesButtonLabel}
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </AriaModal>
    </>
  );
};

export default Cookies;
