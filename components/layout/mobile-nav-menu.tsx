import { MouseEvent } from "react";
import { NavbarData } from "types/layout/navbar-data";
import { MdClose } from "react-icons/md";
import CustomLink from "@/components/links/custom-link";

type MobileNavMenuProps = {
    navbar: NavbarData;
    closeSelf: (e: MouseEvent<HTMLElement>) => void
}
 
const MobileNavMenu:React.FC<MobileNavMenuProps> = ({ navbar, closeSelf }) => {
    return (
        <>
            <button title="close menu" onClick={closeSelf}>
                <MdClose style={{ color: "#000" }} />
            </button>
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
        </>
    );
}
 
 
export default MobileNavMenu;