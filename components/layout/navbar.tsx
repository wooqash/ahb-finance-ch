import { useState } from "react";
import { useRouter } from "next/router";
import { NavbarData } from "types/layout/navbar-data";
import { ExtendedPageContextData } from "types/page-context-data";
import CustomLink from "@/components/links/custom-link";
import MobileNavMenu from "./mobile-nav-menu";
import LangSwitcher from "../lang-switcher";
import LocaleSwitch from "../locale-switch";
import { MdMenu } from "react-icons/md";
import { SocialMediaLinksData } from "types/social-media-links-data";

type NavbarProps = {
  navbar: NavbarData;
  socialMedia?: SocialMediaLinksData;
  pageContext: ExtendedPageContextData;
};

const Navbar: React.FC<NavbarProps> = ({ navbar, pageContext }) => {
  const router = useRouter();
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);

  return (
    <>
      <nav>
        <ul>
          {navbar.menuItems.map((menuItem) => (
            <li key={menuItem.id} style={{ color: "#000" }}>
              {menuItem.navLevelLabel ? (
                <>
                  {menuItem.navLevelLabel}
                  <ul>
                    {menuItem.link.map((link) => (
                      <li key={link.id}>
                        <CustomLink link={link}>
                          <span>{link.label}</span>
                        </CustomLink>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <CustomLink link={menuItem.link[0]}>
                  <span>{menuItem.link[0].label}</span>
                </CustomLink>
              )}
            </li>
          ))}
        </ul>
        {pageContext.localizedPaths && <LocaleSwitch pageContext={pageContext} /> }
        <button title="open menu" style={{ color: "#000" }} onClick={() => setMobileMenuIsShown(true)}>
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
