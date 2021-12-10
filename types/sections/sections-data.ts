import { AdvantageData } from "types/elements/advantage-data";
import { FaqItemData } from "types/elements/faq-item-data";
import { OfferData } from "types/elements/offer-data";
import { PartnerItem } from "types/elements/partner-item";
import { PublicationItem } from "types/elements/publication-item";
import { TileData } from "types/elements/tile-data";
import { ButtonLink } from "types/links/button-link";
import { IconButtonLink } from "types/links/icon-button-link";
import { SectionType } from "./section-type.enum";

export type SectionData = {
    __component: string,
    id: number | string,
}

export type AdvantagesGroupData =  {
    type: SectionType.ADVANTAGES,
    title: string,
    advantages: AdvantageData[],
} & SectionData;

export type FaqGroupData = {
    type: SectionType.FAQS,
    questionAndAnswer: FaqItemData[],
    title?: string,
    moreBtn?: ButtonLink,
} & SectionData;

export type HeroData = {
    type: SectionType.HERO,
    title: string,
    cta?: ButtonLink[],
} & SectionData;

export type OffersGroupData = {
    type: SectionType.OFFERS,
    title?: string,
    offerGroups: OfferData[],
} & SectionData;

export type PartnersData = {
    type: SectionType.PARTNERS,
    title?: string,
    partners: PartnerItem[],
} & SectionData;

export type RichtextWithCtaData = {
    type: SectionType.RICHTEXTWITHCTA,
    title?: string,
    content: string,
    cta: ButtonLink,
} & SectionData;

export type TestimonialsGroupData = {
    type: SectionType.TESTIMONIALS,
    title?: string,
    testimonials: TileData[],
} & SectionData;

export type PublicationsGroupData = {
    type: SectionType.PUBLICATIONS,
    title?: string,
    publications: PublicationItem[],
} & SectionData;

export type SectionsData = AdvantagesGroupData | FaqGroupData | HeroData | OffersGroupData | PartnersData | RichtextWithCtaData | TestimonialsGroupData | PublicationsGroupData;
