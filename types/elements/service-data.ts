import { Media } from "types/media";

export interface ServiceData {
    id: number | string;
    title: string;
    description: string;
    icon?: Media;
}