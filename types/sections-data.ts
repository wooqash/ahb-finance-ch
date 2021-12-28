
import { AdvantageData } from "types/elements/advantage-data";
import { FaqItemData } from "types/elements/faq-item-data";
import { OfferData } from "types/elements/offer-data";
import { CollabolatorItemData } from "types/elements/collabolator-item-data";
import { PublicationItem } from "types/elements/publication-item";
import { TileData } from "types/elements/tile-data";
import { ButtonLinkData } from "types/buttons-data";
import { ArticleData } from "./blog-data";
import { NewsletterModalInfoData } from "./newsletter-modal-info-data";

export enum SectionType {
    HERO = "HERO",
    ADVANTAGES = "ADVANTAGESGROUP",
    FAQS = "FAQGROUP",
    OFFERS = "OFFERSGROUP",
    COLLABOLATORS = "COLLABOLATORSGROUP",
    RICHTEXTWITHCTA = "RICHTEXTWITHCTA",
    TESTIMONIALS = "TESTIMONIALSGROUP",
    PUBLICATIONS = "PUBLICATIONSGROUP",
    NEWSLETTER = "NEWSLETTERFORM",
    BLOG ="BLOG"
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

export interface CollabolatorsGroupData extends SectionData{
    type: SectionType.COLLABOLATORS,
    title?: string,
    collabolators: CollabolatorItemData[],
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
    publications: PublicationItem[],
};

export interface NewsletterForm extends SectionData {
    type: SectionType.NEWSLETTER,
    title?: string,
    cta: ButtonData,
    modalInfo: NewsletterModalInfoData,
}

export type SectionsData = AdvantagesGroupData | BlogData | FaqGroupData | HeroData | OffersGroupData | CollabolatorsGroupData | RichtextWithCtaData | TestimonialsGroupData | PublicationsGroupData | NewsletterForm;
