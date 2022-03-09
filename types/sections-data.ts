
import { AdvantageData } from "types/elements/advantage-data";
import { FaqItemData } from "types/elements/faq-item-data";
import { OfferData } from "types/elements/offer-data";
import { PartnerItemData } from "types/elements/partner-item-data";
import { PublicationItemData } from "types/elements/publication-item-data";
import { TileData } from "types/elements/tile-data";
import { ButtonData, ButtonLinkData, LinkData } from "types/buttons-data";
import { ArticleData } from "./blog-data";
import { NewsletterModalInfoData } from "./newsletter-modal-info-data";
import { Media } from "./media";

export enum SectionType {
    HERO = "HERO",
    ADVANTAGES = "ADVANTAGESGROUP",
    FAQS = "FAQGROUP",
    OFFERS = "OFFERSGROUP",
    PARTNERS = "PARTNERSGROUP",
    RICHTEXTWITHCTA = "RICHTEXTWITHCTA",
    TESTIMONIALS = "TESTIMONIALSGROUP",
    PUBLICATIONS = "PUBLICATIONSGROUP",
    NEWSLETTER = "NEWSLETTERFORM",
    BLOG ="BLOG",
    ABOUT = "ABOUT_SECTION"
}

export interface SectionData {
    __component: string,
    id: number | string,
}
export interface AdvantagesGroupData extends SectionData{
    type: SectionType.ADVANTAGES,
    title: string,
    advantages: AdvantageData[],
};

export interface BlogData extends SectionData{
    type: SectionType.BLOG,
    title: string,
    moreBtn?: ButtonLinkData,
};

export interface FaqGroupData extends SectionData{
    type: SectionType.FAQS,
    questionAndAnswer: FaqItemData[],
    title?: string,
    moreBtn?: ButtonLinkData,
};

export interface HeroData extends SectionData{
    type: SectionType.HERO,
    title: string,
    cta?: ButtonLinkData[],
};

export interface OffersGroupData extends SectionData{
    type: SectionType.OFFERS,
    title?: string,
    offerGroups: OfferData[],
};

export interface PartnersGroupData extends SectionData{
    type: SectionType.PARTNERS,
    title?: string,
    partners: PartnerItemData[],
};

export interface RichtextWithCtaData extends SectionData{
    type: SectionType.RICHTEXTWITHCTA,
    title?: string,
    content: string,
    cta: ButtonLinkData[],
};

export interface TestimonialsGroupData extends SectionData{
    type: SectionType.TESTIMONIALS,
    title?: string,
    testimonials: TileData[],
};

export interface PublicationsGroupData extends SectionData{
    type: SectionType.PUBLICATIONS,
    title?: string,
    publications: PublicationItemData[],
};

export interface NewsletterForm extends SectionData {
    type: SectionType.NEWSLETTER,
    title?: string,
    cta: ButtonData,
    modalInfo: NewsletterModalInfoData,
}

export interface AboutSectionData extends SectionData {
    type: SectionType.ABOUT,
    title: string,
    description: string,
    readMoreLink?: ButtonLinkData,
    sideImage?: Media;
}

export type SectionsData = AboutSectionData | AdvantagesGroupData | BlogData | FaqGroupData | HeroData | OffersGroupData | PartnersGroupData | RichtextWithCtaData | TestimonialsGroupData | PublicationsGroupData | NewsletterForm;
