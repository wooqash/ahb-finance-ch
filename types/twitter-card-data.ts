import { Media } from "./media";
import { TwitterCardApp } from "./twitter-card-app";
import { TwitterCardPlayer } from "./twitter-card-player";
import { TwitterCardType } from "./twitter-card-type.enum";

export type TwitterCardData = {
    card: TwitterCardType;
    username: string;
    title?: string;
    description?: string;
    image?: Media;
    player?: TwitterCardPlayer;
    app?: TwitterCardApp;
}