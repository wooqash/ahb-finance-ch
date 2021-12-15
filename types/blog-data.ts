import { Media } from "./media";

export interface CategoryData {
    id: number | string;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

export interface AuthorData {
    id: number | string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    picture: Media;
}

export interface ArticleData {
    id: number | string;
    title: string;
    description: string;
    content: string;
    publishedAt: string;
    status: "draft" | "published";
    slug: string;
    category: CategoryData[];
    author: AuthorData;
    created_at: string;
    updated_at: string;
    locale: string;
    image: Media;
}
