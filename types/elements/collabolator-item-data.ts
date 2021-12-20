
import { LinkData } from "types/buttons-data";
import { Media } from "types/media";

export type CollabolatorItemData = {
    id: number | string;
    collabName: string;
    collabDescritpion: string;
    collabCompanyName?: string;
    collabCompanyUrl?: LinkData;
    collabImage?: Media;
    collabCompanyLogo?: Media;
}