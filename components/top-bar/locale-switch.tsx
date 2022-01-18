import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

import Cookies from "js-cookie";

import { ExtendedPageContextData } from "types/page-context-data";
import { getLocalizedPage, localizePath } from "utils/localize";

import style from "./locale-switch.module.scss";
import { LinkData } from "types/buttons-data";
import DropdownButton from "./dropdown-button";
import DropdownMenu from "./dropdown-menu";
import { PageAppearance } from "types/page-appearance.enum";


type LocaleSwitchProps = {
    pageContext: ExtendedPageContextData;
    appearance: PageAppearance;
}
 
const LocaleSwitch:React.FC<LocaleSwitchProps> = (props) => {
    const { pageContext, appearance } = props;
    const isMounted = useRef(false);
    const router = useRouter();
    const [locale, setLocale] = useState(router.locale);

    const numberOfItems = pageContext.localizedPaths?.length || 0;
    const { buttonProps, itemProps, isOpen } = useDropdownMenu(numberOfItems);
    
    const formatLocaleLabel = (label: string | undefined) => {
        if (!label) {
            return '';
        }

        return label.indexOf('-') > -1 ? label.substring(0, label.indexOf('-')) : label;
    }

    const handleLocaleChange = async (selectedLocale: string) => {
        console.log(selectedLocale);
        // Persist the user's language preference
        // https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
        Cookies.set("NEXT_LOCALE", selectedLocale);
        setLocale(selectedLocale);
    }

    const localizationLinks = pageContext.localizedPaths?.map(({ href, locale }, index) => {
        const link: LinkData = {
            id: index,
            label: formatLocaleLabel(locale),
            url: href,
            newTab: false,
            ariaNewTabLabel: locale,
        }

        return link;
    });

    const localizationLinksWithItemProps = localizationLinks?.map((localizationLink: LinkData, index: number) => {
        return {...localizationLink, ...itemProps[index]}
    });

    const handleLocaleChangeRef = useRef(handleLocaleChange);

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
        }
    
        setLocale(localeCookie || router.locale);
        checkLocaleMismatch();
    
        return () => {
          isMounted.current = true;
        }
      }, [locale, router, pageContext]);

    return (
        <div className={style["locale-switch"]}>
            <DropdownButton buttonProps={buttonProps} isOpen={isOpen} label={formatLocaleLabel(router.locale)} appearance={appearance} />
            <DropdownMenu label={locale} items={localizationLinksWithItemProps ? localizationLinksWithItemProps : []} isOpen={isOpen} />
        </div>
    );
}
 
 
export default LocaleSwitch;