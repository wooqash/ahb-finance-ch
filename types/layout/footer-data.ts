import { ContactInfoData } from "types/contact-info-data";
import { CreatorData } from "types/creator-data";
import { LinkData, LogoLinkData } from "../buttons-data";

export interface FooterColumnData {
    id: number | string;
    title?: string;
    links: LinkData[]; 
}

export interface FooterData {
    columns?: FooterColumnData[];
    contactInfo?: ContactInfoData;
    copyrightText?: string;
    creators?: CreatorData[];
    legalLinks?: LinkData[];
    logo?: LogoLinkData;
}