
import { LinkData } from "types/buttons-data";
import { Media } from "types/media";

export type PartnerItemData = {
    id: number | string;
    name: string;
    description: string;
    company?: string;
    smallImage?: Media;
    largeImage?: Media;
    companyLogo?: Media;
    companyUrl?: LinkData;
}