export enum CookieGroupTypes {
    necessary = 'necessary',
    preferences = 'preferences',
    stats = 'stats',
    marketing = 'marketing',
    social = 'social',
    unclassified = 'unclassified',
}

export type CookieInfoData = {
    cookieBannerText: string;
    settingsTitle: string;
    settingsButtonLabel: string;
    acceptAllCookiesButtonLabel: string;
    acceptSelectedCookiesButtonLabel: string;
    acceptNecessaryCookiesButtonLabel: string;
    acceptButtonLabel: string;
    cookieLblSingle: string;
    cookieLblPlural: string;
    tabs:  [{
        id: number | string;
        label: string;
        description: string;
    }]
    groups: [{
        id: number | string;
        groupName: CookieGroupTypes;
        title: string;
        description: string;
    }]
}