// import '@/styles/index.css'
import "../styles/index.scss";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

import { useEffect, useState, MouseEvent } from "react";
import { CookiesProvider } from "react-cookie";

import { CookieInfoData } from "types/cookie-info-data";

import Spinner from "@/components/spinner";
import Cookies from '@/components/Cookies/cookies';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const cookieInfo: CookieInfoData = pageProps?.content?.global?.cookieInfo;
  const [loading, setLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const activateModal = (e: MouseEvent) => {
    e.preventDefault();
    setModalActive(true);
  };

  useEffect(() => {
    const handleStart = (url: string) => setLoading(true);
    const handleComplete = (url: string) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    <CookiesProvider>
      <>
        <Component showCookiePolicy={activateModal} {...pageProps} />
        {loading && <Spinner />}
        {cookieInfo && <Cookies content={cookieInfo} isActive={modalActive} onActivateModal={activateModal} setModalActive={setModalActive} />}
      </>
    </CookiesProvider>
  );
};

export default MyApp;
