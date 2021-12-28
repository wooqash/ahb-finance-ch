import { LinkData, LogoLinkData } from "../buttons-data";
import { ContactInfo } from "../contact-info-data";


interface FooterColumnData {
    id: number | string;
    title?: string;
    links: LinkData[]; 
}

export interface FooterData {
    columns?: FooterColumnData[];
    contactInfo?: ContactInfo;
    copyrightText?: string;
    createdBy?: string;
    legalLinks?: LinkData[];
    logo?: LogoLinkData;
}