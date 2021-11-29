import { LinkData } from "types/links/link-data";

export type NavItemData = {
    id: number;
    navLevelLabel?: string;
    link: LinkData[];
}