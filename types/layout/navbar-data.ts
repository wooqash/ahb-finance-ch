import { LogoData } from "types/elements/logo-data";
import { NavItemData } from "types/elements/nav-item-data";

export type NavbarData = {
    logo?: LogoData;
    menuItems: NavItemData[];
}