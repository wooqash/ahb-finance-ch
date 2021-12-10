import { ButtonLink } from "types/links/button-link";
import { ListItem } from "./list-item";

export type OfferData = {
    groupName: string;
    offer: ListItem[];
    moreBtn: ButtonLink;
}