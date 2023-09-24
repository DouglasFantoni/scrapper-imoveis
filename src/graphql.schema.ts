
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class NewImovel {
    title: string;
    slug: string;
    url: string;
    description: string;
    amount: number;
    websiteId: string;
    type?: Nullable<string>;
    image?: Nullable<string>;
    size?: Nullable<string>;
    status?: Nullable<string>;
}

export class NewPage {
    relativeUrl: string;
    websiteId: string;
}

export class NewWebsitePage {
    relativeUrl: string;
}

export class NewPost {
    title: string;
    text: string;
}

export class UpdatePost {
    id: string;
    title?: Nullable<string>;
    text?: Nullable<string>;
    isPublished?: Nullable<boolean>;
}

export class NewWebsite {
    name: string;
    baseUrl: string;
    slug: string;
    isActive: boolean;
    pages: NewWebsitePage[];
}

export class Imovel {
    id: string;
    title: string;
    slug: string;
    url: string;
    description: string;
    amount: number;
    websiteId: string;
    type?: Nullable<string>;
    image?: Nullable<string>;
    size?: Nullable<string>;
    status?: Nullable<string>;
}

export class ImovelResponse {
    title: string;
    slug: string;
    url: string;
    description: string;
    amount: number;
    type?: Nullable<string>;
    image?: Nullable<string>;
    size?: Nullable<string>;
    status?: Nullable<string>;
}

export class Page {
    id: string;
    relativeUrl: string;
    websiteId: string;
}

export class Post {
    id: string;
    title: string;
    text: string;
    isPublished: boolean;
}

export abstract class IQuery {
    abstract posts(): Post[] | Promise<Post[]>;

    abstract post(id: string): Nullable<Post> | Promise<Nullable<Post>>;

    abstract imoveis(): Imovel[] | Promise<Imovel[]>;

    abstract websites(): Website[] | Promise<Website[]>;

    abstract pages(): Page[] | Promise<Page[]>;

    abstract find(): Nullable<ImovelResponse>[] | Promise<Nullable<ImovelResponse>[]>;

    abstract removeAll(): Nullable<string> | Promise<Nullable<string>>;

    abstract removeAllImoveis(): Nullable<string> | Promise<Nullable<string>>;
}

export abstract class IMutation {
    abstract createWebsite(website: NewWebsite): Website | Promise<Website>;

    abstract createImovel(imovel: NewImovel): Imovel | Promise<Imovel>;

    abstract createPage(page: NewPage): Page | Promise<Page>;

    abstract createPost(input: NewPost): Post | Promise<Post>;

    abstract updatePost(input: UpdatePost): Nullable<Post> | Promise<Nullable<Post>>;

    abstract deletePost(id: string): Nullable<Post> | Promise<Nullable<Post>>;
}

export abstract class ISubscription {
    abstract postCreated(): Nullable<Post> | Promise<Nullable<Post>>;

    abstract websiteCreated(): Nullable<Website> | Promise<Nullable<Website>>;

    abstract pageCreated(): Nullable<Page> | Promise<Nullable<Page>>;

    abstract imovelCreated(): Nullable<Imovel> | Promise<Nullable<Imovel>>;
}

export class Website {
    id: string;
    name: string;
    baseUrl: string;
    slug: string;
    isActive: boolean;
    pages: Page[];
    imoveis: Imovel[];
}

type Nullable<T> = T | null;
