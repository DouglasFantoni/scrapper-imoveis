
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class NewPage {
    id?: Nullable<string>;
    name?: Nullable<string>;
    websiteId?: Nullable<string>;
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
    isActive?: Nullable<boolean>;
    pages?: Nullable<Nullable<NewPage>[]>;
}

export class Imovel {
    id?: Nullable<string>;
    slug: string;
    title: string;
    amount: number;
    url: string;
    description?: Nullable<string>;
    type?: Nullable<string>;
    image?: Nullable<string>;
    size?: Nullable<string>;
    status?: Nullable<string>;
    website?: Nullable<Website>;
    websiteId?: Nullable<string>;
}

export class Page {
    id?: Nullable<string>;
    name?: Nullable<string>;
    website?: Nullable<Website>;
    websiteId?: Nullable<string>;
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

    abstract websites(): Imovel[] | Promise<Imovel[]>;
}

export abstract class IMutation {
    abstract createWebsite(website?: Nullable<NewWebsite>): Nullable<Website> | Promise<Nullable<Website>>;

    abstract createPost(input: NewPost): Post | Promise<Post>;

    abstract updatePost(input: UpdatePost): Nullable<Post> | Promise<Nullable<Post>>;

    abstract deletePost(id: string): Nullable<Post> | Promise<Nullable<Post>>;
}

export abstract class ISubscription {
    abstract postCreated(): Nullable<Post> | Promise<Nullable<Post>>;
}

export class Website {
    id?: Nullable<string>;
    name: string;
    baseUrl: string;
    slug: string;
    isActive: boolean;
    pages?: Nullable<Nullable<Page>[]>;
    imoveis?: Nullable<Nullable<Imovel>[]>;
}

type Nullable<T> = T | null;
