import { useState } from "react";
import { NavbarData } from "types/layout/navbar-data";
import { ExtendedPageContextData } from "types/page-context-data";
import MobileNavMenu from "../layout/mobile-nav-menu";

import { MdMenu } from "react-icons/md";
import { SocialMediaLinksData } from "types/social-media-links-data";
import style from "./navbar.module.scss";
import MainMenu from "../top-bar/main-menu";
import LocaleSwitch from "../top-bar/locale-switch";
import { PageAppearance } from "types/page-appearance.enum";
import SkipLink from "../links/skip-link";
import CustomLink from "../links/custom-link";
import CustomImage from "../elements/custom-image";
import SocialMediaLinks from "../top-bar/social-media-links";

type NavbarProps = {
  navbar: NavbarData;
  socialMedia?: SocialMediaLinksData;
  pageContext: ExtendedPageContextData;
  appearance: PageAppearance;
  skipLabel: string;
};

const Navbar: React.FC<NavbarProps> = (props) => {
  const { navbar, socialMedia, pageContext, appearance, skipLabel } = props;
  const { menuItems, logo } = navbar;
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);
  return (
    <>
      <nav className={style.navbar} aria-label="Main menu">
        <SkipLink label={skipLabel} sectionId="Main" />
        {logo && logo.link ? (
            <CustomLink link={logo.link}>
              <CustomImage media={logo.image} layout="fixed" cWidth={145} cHeight={69} />
            </CustomLink>
        ) : logo ? (
          <CustomImage media={logo.image} />
        ) : (
          ""
        )}
        <div className={style["navbar__menubar"]}>
          <MainMenu
            menuId={`MainMenu`}
            menuItems={menuItems}
            appearance={appearance}
          />
          {socialMedia && <SocialMediaLinks links={socialMedia.links} />}
          {pageContext.localizedPaths && (
            <LocaleSwitch pageContext={pageContext} appearance={appearance} />
          )}
        </div>
        
        <button title="open menu" onClick={() => setMobileMenuIsShown(true)}>
          <MdMenu />
        </button>
        {mobileMenuIsShown && (
          <MobileNavMenu
            navbar={navbar}
            closeSelf={() => setMobileMenuIsShown(false)}
          />
        )}
      </nav>
    </>
  );
};

export default Navbar;
