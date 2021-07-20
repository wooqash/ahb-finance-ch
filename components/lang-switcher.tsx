import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./lang-switcher.module.scss";

type LangSwitcherProps = {};

const LangSwitcher: React.FC<LangSwitcherProps> = () => {
  const router = useRouter();

  return (
    <ul className={styles.langSwitcher}>
      {router?.locales?.map((locale) => {
        const activeElemClass = locale === router.locale ? styles['langSwitcher__elem--active'] : '';
        const activeLinkClass = locale === router.locale ? styles['langSwitcher__link--active'] : '';
        return (
          <li key={locale} className={`${styles.langSwitcher__elem} ${activeElemClass}`}>
            <Link href={router.asPath} locale={locale}>
              <a className={`${styles.langSwitcher__link} ${activeLinkClass}`}>{locale.substr(0, 2)}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default LangSwitcher;
