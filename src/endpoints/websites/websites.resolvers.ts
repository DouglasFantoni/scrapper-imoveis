import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { Imovel, Page, Website } from "../../graphql.schema";
import { WebsitesService } from "./websites.service";

const pubSub = new PubSub();

@Resolver('Websites')
export class WebsitesResolvers {

  constructor(private readonly websitesService: WebsitesService) {}

  @Query('websites')
  async getAll(): Promise<(Website & { imoveis: Imovel[]; pages: Page[]; })[]>{
    return this.websitesService.getAll();
  }

  @Mutation('createWebsite')
  async create(@Args('website') website: Website): Promise<Website>{
    const createdWebsite = await this.websitesService.create(website);
    pubSub.publish('websiteCreated', { websiteCreated: createdWebsite });
    return createdWebsite;
  }
}
