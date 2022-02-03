import { LogoLinkData } from "types/buttons-data";
import { MenuItemData } from "types/elements/menu-item-data";

export type NavbarData = {
    logo?: LogoLinkData;
    logoAlt?: LogoLinkData;
    menuItems: MenuItemData[];
}