import { Media } from "./media";
import { OpenGraphLocales } from "./open-graph-locales.enum";
import { OpenGraphMedia } from "./open-graph-media";
import { OpenGraphTypes } from "./open-graph-types.enum";

export type OpenGraphData = {
    title?: string;
    url?: string;
    type?: OpenGraphTypes;
    image?: OpenGraphMedia;
    description?: string;
    locale?: OpenGraphLocales;
    fbAppId?: string;
}