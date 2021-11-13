import { FooterSectionData } from "types/elements/footer-section-data";
import { LogoData } from "types/elements/logo-data";

export type FooterData = {
    logo?: LogoData;
    copyrightText?: string;
    columns: FooterSectionData[];
}