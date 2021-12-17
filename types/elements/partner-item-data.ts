
import { LinkData } from "types/buttons-data";
import { Media } from "types/media";

export type PartnerItemData = {
    id: number | string;
    partnerName: string;
    companyName: string;
    descritpion: string;
    avatar: Media;
    companyUrl: LinkData;
}