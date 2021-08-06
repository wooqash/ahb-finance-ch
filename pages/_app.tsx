// import '@/styles/index.css'
import "../styles/index.scss";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

import { useEffect, useState, ChangeEvent, MouseEvent } from "react";
import { useCookies, CookiesProvider } from "react-cookie";
import AriaModal from "react-aria-modal";

import { CookieInfoData } from "types/cookie-info-data";
import { CookieGroupsFlags } from "types/cookie-groups-flags";

import usePrevious from '@/lib/usePrevious';
import Spinner from "@/components/spinner";
import CookieBanner from "@/components/cookie-banner";
import CookieInfoBox from "@/components/cookie-info-box";
import Modal from "@/components/modal";
import dayjs from "dayjs";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const consentPropertyName = "COOKIE_CONSENT";
  const cookieInfo: CookieInfoData = pageProps?.content?.global?.cookieInfo;
  const { settingsTitle, tabs, groups, acceptAllCookiesButtonLabel, acceptSelectedCookiesButtonLabel, acceptNecessaryCookiesButtonLabel } = cookieInfo;
  const defaultCookieConsents: CookieGroupsFlags = {
    necessary: true,
    preferences: false,
    stats: false,
    marketing: false,
    social: false,
    unclassified: false,
  }

  const [loading, setLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false);
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

  const activateModal = (e: MouseEvent) => {
    e.preventDefault();
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

  useEffect(() => {
    const handleStart = (url: string) => setLoading(true);
    const handleComplete = (url: string) => setLoading(false);

    if (prevCookieGroupConsents?.cookieGroupConsents && prevCookieGroupConsents?.cookieGroupConsents !== cookieGroupConsents) {
      saveCookieConsent();
    }

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [cookieGroupConsents]);

  return (
    <CookiesProvider>
      <>
        <Component showCookiePolicy={activateModal} {...pageProps} />
        {loading && <Spinner />}
        {!cookieConsents[consentPropertyName] && cookieInfo && (
          <CookieBanner
            content={cookieInfo}
            onAcceptAllCookies={acceptAllCookies}
            onActivateModal={activateModal}
          />
        )}
        <AriaModal
          mounted={modalActive}
          onEnter={onModalEnter}
          onExit={deactivateModal}
          titleText={settingsTitle}
          initialFocus="#ModalCloseButton"
          getApplicationNode={getApplicationNode}
          includeDefaultStyles={false}
        >
          <Modal content={{ title: settingsTitle }} isActive={modalHasEntered} id="CookieConsentModal" onClose={deactivateModal}>
            <CookieInfoBox content={{ tabs, groups, acceptAllCookiesButtonLabel, acceptSelectedCookiesButtonLabel, acceptNecessaryCookiesButtonLabel }} consents={cookieGroupConsents} onAcceptAllCookies={acceptAllCookies} onAcceptSelectedCookies={acceptSelectedCookies} onAcceptNecessaryCookies={acceptNecessaryCookies} onHandleChange={changeCookieConsents}></CookieInfoBox>
          </Modal>
        </AriaModal>
      </>
    </CookiesProvider>
  );
};

export default MyApp;
