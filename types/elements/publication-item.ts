import { ButtonLink } from "types/links/button-link";
import { Media } from "types/media";

export type PublicationItem = {
    title: string;
    description: string;
    image: Media;
    links: ButtonLink[];
}