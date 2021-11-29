import { useRouter } from "next/router";
import { NavbarData } from "types/layout/navbar-data";
import { ExtendedPageContextData } from "types/page-context-data";
import CustomLink from "@/components/links/custom-link";
import LangSwitcher from "../lang-switcher";

type NavbarProps = {
  navbar: NavbarData;
  pageContext: ExtendedPageContextData;
};

const Navbar: React.FC<NavbarProps> = ({ navbar, pageContext }) => {
  const router = useRouter();

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
        <LangSwitcher />
      </nav>
    </>
  );
};

export default Navbar;
