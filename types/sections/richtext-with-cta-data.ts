import { ButtonLink } from "types/links/button-link";

export type RichtextWithCtaData = {
    title?: string;
    content: string;
    cta: ButtonLink;
}