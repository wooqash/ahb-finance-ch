import { LinkData } from "types/links/link-data";
import { Media } from "types/media";

export type PartnerItem = {
    partnerName: string;
    companyName: string;
    descritpion: string;
    avatar: Media;
    companyUrl: LinkData;
}