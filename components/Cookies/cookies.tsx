import React, {
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
import { CookieType, CookieTypeSum, CookieGroupsFlags } from "types/cookies";

import Button from "@/components/button";
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
    cookieLblSingle,
    cookieLblPlural,
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

  useEffect(() => {
    if (
      prevCookieGroupConsents?.cookieGroupConsents &&
      prevCookieGroupConsents?.cookieGroupConsents !== cookieGroupConsents
    ) {
      saveCookieConsent();
    }
  }, [cookieGroupConsents]);

  const cookieTypes: CookieType = {
    necessary: ["COOKIE_CONSENT"],
    preferences: ["NEXT_LOCALE"],
    stats: [],
    marketing: [],
    social: [],
    unclassified: [],
  };

  const acceptAllCookies = () => {
    let newCookieConsents = defaultCookieConsents;
    for (let cookieName in defaultCookieConsents) {
      newCookieConsents = {...newCookieConsents, [cookieName]: cookieName === 'necessary' || cookieTypesSum[cookieName] ? true : false }
    }
    setCookieGroupConsents(newCookieConsents);
    saveCookieConsent();
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
    saveCookieConsent();
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

  const assignCookiesToTypes = () => {
      let initialCookieSum: CookieTypeSum = {
          necessary: 0,
          preferences: 0,
          stats: 0,
          marketing: 0,
          social: 0,
          unclassified: 0,
      }
      for(let cookieName in cookieConsents){
          for (let cookieType in cookieTypes) {
              
              if (cookieTypes[cookieType].find((cookie: string) => cookie === cookieName)) {
                  initialCookieSum = {...initialCookieSum, [cookieType]: initialCookieSum[cookieType]+1};
                }
              }
            }
      return initialCookieSum;
  }

  const cookieTypesSum = React.useMemo(() => assignCookiesToTypes(), [cookieConsents]);

  return (
    <>
      {!cookieConsents[consentPropertyName] && content && (
        <CookieBanner
          content={{ cookieBannerText, settingsButtonLabel, acceptButtonLabel }}
          onAcceptAllCookies={acceptAllCookies}
          onActivateModal={onActivateModal}
        />
      )}
      {(isActive && <AriaModal
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
                cookieLblSingle,
                cookieLblPlural,
              }}
              cookieTypesSum={cookieTypesSum}
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
      </AriaModal>)}
    </>
  );
};

export default Cookies;
