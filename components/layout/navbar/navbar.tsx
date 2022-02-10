import { useEffect, useState } from "react";
import { NavbarData } from "types/layout/navbar-data";
import { ExtendedPageContextData } from "types/page-context-data";

import { MdClose, MdMenu } from "react-icons/md";
import { SocialMediaLinksData } from "types/social-media-links-data";
import style from "./navbar.module.scss";

import { PageAppearance } from "types/page-appearance.enum";

import SocialMediaLinks from "./social-media-links/social-media-links";
import MainMenu from "./main-menu/main-menu";
import LocaleSwitch from "./locale-switch/locale-switch";
import SkipLink from "./skip-link/skip-link";
import Logo from "@/components/logo/logo";

type NavbarProps = {
  navbar: NavbarData;
  socialMedia?: SocialMediaLinksData;
  pageContext: ExtendedPageContextData;
  appearance: PageAppearance;
  skipLabel: string;
};

const Navbar: React.FC<NavbarProps> = (props) => {
  const { navbar, socialMedia, pageContext, appearance, skipLabel } = props;
  const { menuItems, logo, logoAlt } = navbar;
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);

  const handleOpenMobileMenuButton = () => {
    setMobileMenuIsShown(true);
  };

  const handleCloseMobileMenuButton = () => {
    setMobileMenuIsShown(false);
  };

  const [stickyClass, setStickyClass] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);

    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 50 ? setStickyClass("navbar--sticky") : setStickyClass('');
    }
  };

  return (
      <nav
        className={`${style.navbar} ${
          mobileMenuIsShown ? style["navbar--open"] : ""
        } ${
          appearance === PageAppearance.light
            ? style["navbar--light"]
            : style["navbar--dark"]
        } ${style[stickyClass]}`}
        aria-label="Main menu"
      >
        <div className={style.navbar__wrapper}>
          <SkipLink label={skipLabel} sectionId="Main" />
          {logo &&  (
            <div className={style.navbar__logo}>
              {logoAlt && (appearance === PageAppearance.light || stickyClass) ? <Logo data={logoAlt} /> : <Logo data={logo} /> }
            </div>
          )}
          <div className={style.navbar__menubar}>
            <MainMenu
              menuId={`MainMenu`}
              menuItems={menuItems}
            />
            <div className={style["navbar__menubar-other-links"]}>
              {socialMedia && (
                <SocialMediaLinks
                  customClasses={style["sm-list"]}
                  links={socialMedia.links}
                />
              )}
              {pageContext.localizedPaths && (
                <LocaleSwitch pageContext={pageContext} />
              )}
            </div>
          </div>

          <button
            className={style["navbar__mobile-menu-button"]}
            title="open menu"
            onClick={
              !mobileMenuIsShown
                ? handleOpenMobileMenuButton
                : handleCloseMobileMenuButton
            }
          >
            {!mobileMenuIsShown && <MdMenu />}
            {mobileMenuIsShown && <MdClose />}
          </button>
        </div>
      </nav>

  );
};

export default Navbar;
