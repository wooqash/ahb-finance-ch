

import { ButtonLinkData } from "types/buttons-data";
import { Media } from "types/media";

export type PublicationItemData = {
    id: number | string;
    title: string;
    description: string;
    image: Media;
    links: ButtonLinkData[];
}