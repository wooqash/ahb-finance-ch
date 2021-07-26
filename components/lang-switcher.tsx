import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./lang-switcher.module.scss";
import { useCookies } from 'react-cookie';

import { MouseEvent } from 'react';

type LangSwitcherProps = {};

const LangSwitcher: React.FC<LangSwitcherProps> = () => {
  const [ cookie, setCookie ] = useCookies(['NEXT_LOCALE']);
  const router = useRouter();
  const { locale, locales } = router;

  const handleSwitchLang = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = e.target as HTMLAnchorElement;
    const selectedLocale = target.hreflang;
    if(cookie.NEXT_LOCALE !== selectedLocale){
      setCookie("NEXT_LOCALE", selectedLocale, { path: "/" });
    }
  }

  return (
    <ul className={styles.langSwitcher}>
      {locales?.map((loc) => {
        const activeElemClass = loc === locale ? styles['langSwitcher__elem--active'] : '';
        const activeLinkClass = loc === locale ? styles['langSwitcher__link--active'] : '';
        return (
          <li key={loc} className={`${styles.langSwitcher__elem} ${activeElemClass}`}>
            <Link href={router.asPath} locale={loc} passHref>
              <a onClick={handleSwitchLang} className={`${styles.langSwitcher__link} ${activeLinkClass}`} hrefLang={loc}>{loc.substr(0, 2)}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default LangSwitcher;
