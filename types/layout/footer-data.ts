import { ContactInfoData } from "types/contact-info-data";
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
    createdBy?: string;
    legalLinks?: LinkData[];
    logo?: LogoLinkData;
}