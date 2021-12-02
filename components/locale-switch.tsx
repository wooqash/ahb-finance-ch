import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Cookies from "js-cookie";
import { MdExpandMore } from "react-icons/md";


import { useOnClickOutside } from "../utils/hooks"
import { ExtendedPageContextData } from "types/page-context-data";
import { getLocalizedPage, localizePath } from "utils/localize";


type LocaleSwitchProps = {
    pageContext: ExtendedPageContextData;
}
 
const LocaleSwitch:React.FC<LocaleSwitchProps> = ({ pageContext }) => {
    const isMounted = useRef(false);
    const select = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [locale, setLocale] = useState(router.locale);
    const [showing, setShowing] = useState(false);

    const handleLocaleChange = async (selectedLocale: string) => {
        // Persist the user's language preference
        // https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
        Cookies.set("NEXT_LOCALE", selectedLocale);
        setLocale(selectedLocale);
    }

    const handleLocaleChangeRef = useRef(handleLocaleChange);
    useOnClickOutside(select, () => setShowing(false));

    useEffect(() => {
        const localeCookie = Cookies.get("NEXT_LOCALE");
        if (!localeCookie && router.locale) {
          handleLocaleChangeRef.current(router.locale);
        }
    
        const checkLocaleMismatch = async () => {
          if (
            !isMounted.current &&
            localeCookie &&
            localeCookie !== pageContext.locale
          ) {
            // Redirect to locale page if locale mismatch
            const localePage = await getLocalizedPage(localeCookie, pageContext);
    
            if (localePage) {
                router.push(
                    `${localizePath({ ...pageContext, ...localePage })}`,
                    `${localizePath({ ...pageContext, ...localePage })}`,
                    { locale: localePage.locale }
                );
            }
            
          }
          setShowing(false);
        }
    
        setLocale(localeCookie || router.locale);
        checkLocaleMismatch();
    
        return () => {
          isMounted.current = true;
        }
      }, [locale, router, pageContext]);

    return (
        <div ref={select} style={{ color: "#000" }}>
            <button
                type="button"
                onClick={() => setShowing(!showing)}
            >
                <span>{locale}</span>
                <MdExpandMore />
            </button>
            <div
                className={` ${
                showing ? "absolute" : "hidden"
                }`}
            >
                {pageContext.localizedPaths &&
                pageContext.localizedPaths.map(({ href, locale }) => {
                    return (
                    <Link
                        href={href}
                        key={locale}
                        locale={locale}
                        role="option"
                        passHref
                    >
                        <p
                        onClick={() => handleLocaleChange(locale)}
                        >
                        {locale}
                        </p>
                    </Link>
                    )
                })}
            </div>
        </div>
    );
}
 
 
export default LocaleSwitch;