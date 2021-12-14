
import { ButtonLinkData } from "types/buttons-data";
import { ListItem } from "./list-item";

export interface OfferData {
    id: number | string;
    groupName: string;
    offer: ListItem[];
    moreBtn: ButtonLinkData;
}