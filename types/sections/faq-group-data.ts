import { FaqItemData } from "types/elements/faq-item-data";
import { ButtonLink } from "types/links/button-link";

export type FaqGroupData = {
    questionAndAnswer: FaqItemData[];
    title?: string;
    moreBtn?: ButtonLink;
}