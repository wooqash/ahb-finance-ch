export type CookieType = {
    [name: string]: string[] | never[];
}

export type CookieGroupsFlags = {
    [name: string]: boolean;
}

export type CookieTypeSum = {
    [name: string]: number;
}