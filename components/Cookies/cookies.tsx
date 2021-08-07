import { useEffect, useState, ChangeEvent, MouseEvent, Dispatch, SetStateAction } from "react";
import { useCookies } from "react-cookie";
import AriaModal from "react-aria-modal";

import { CookieInfoData } from "types/cookie-info-data";
import { CookieGroupsFlags } from "types/cookie-groups-flags";

import CookieBanner from "@/components/Cookies/cookie-banner";
import CookieInfoBox from "@/components/Cookies/cookie-info-box";
import Modal from "@/components/modal";

import usePrevious from '@/lib/usePrevious';
import dayjs from "dayjs";

type CookiesProps = {
  content: CookieInfoData;
  isActive: boolean;
  onActivateModal: (e: MouseEvent) => void;
  setModalActive: Dispatch<SetStateAction<boolean>>
};

const Cookies: React.FC<CookiesProps> = ({ content, isActive, onActivateModal, setModalActive }) => {
  console.log(isActive);
  const consentPropertyName = "COOKIE_CONSENT";
  const { settingsTitle, tabs, groups, acceptAllCookiesButtonLabel, acceptSelectedCookiesButtonLabel, acceptNecessaryCookiesButtonLabel, cookieBannerText, settingsButtonLabel, acceptButtonLabel } = content;
  const defaultCookieConsents: CookieGroupsFlags = {
    necessary: true,
    preferences: false,
    stats: false,
    marketing: false,
    social: false,
    unclassified: false,
  }

  const [modalHasEntered, setModalHasEntered] = useState(false);
  const [cookieConsents, setCookieConsents] = useCookies([
    consentPropertyName,
  ]);
  const [cookieGroupConsents, setCookieGroupConsents] = useState<CookieGroupsFlags>(cookieConsents[consentPropertyName] || defaultCookieConsents);
  const prevCookieGroupConsents = usePrevious({cookieGroupConsents});

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
  }

  const acceptSelectedCookies = () => {
    saveCookieConsent();
    deactivateModal();
  }

  const changeCookieConsents = (e: ChangeEvent<HTMLInputElement>) => {
    setCookieGroupConsents({...cookieGroupConsents, [e.target.id]: e.target.checked});
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
  }

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
    if (prevCookieGroupConsents?.cookieGroupConsents && prevCookieGroupConsents?.cookieGroupConsents !== cookieGroupConsents) {
        saveCookieConsent();
      }
  }, [cookieGroupConsents])

  return (
    <>
      {!cookieConsents[consentPropertyName] && content && (
        <CookieBanner
          content={{cookieBannerText, settingsButtonLabel, acceptButtonLabel}}
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
          content={{ title: settingsTitle }}
          isActive={modalHasEntered}
          id="CookieConsentModal"
          onClose={deactivateModal}
        >
          <CookieInfoBox
            content={{
              tabs,
              groups,
              acceptAllCookiesButtonLabel,
              acceptSelectedCookiesButtonLabel,
              acceptNecessaryCookiesButtonLabel,
            }}
            consents={cookieGroupConsents}
            onAcceptAllCookies={acceptAllCookies}
            onAcceptSelectedCookies={acceptSelectedCookies}
            onAcceptNecessaryCookies={acceptNecessaryCookies}
            onHandleChange={changeCookieConsents}
          ></CookieInfoBox>
        </Modal>
      </AriaModal>
    </>
  );
};

export default Cookies;
