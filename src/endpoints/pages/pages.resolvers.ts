import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { NewPage, Page } from '../../graphql.schema';
import { PagesService } from "./pages.service";

const pubSub = new PubSub();

@Resolver('Pages')
export class PagesResolvers {

  constructor(private readonly pagesService: PagesService) {}

  @Query('pages')
  async pages(): Promise<Page[]>{
    return this.pagesService.findAll();
  }

  @Mutation('createPage')
  async createPage(@Args('page') page: NewPage): Promise<Page>{

    
    const createdPage =  this.pagesService.create(page)  
    pubSub.publish('pageCreated', {pageCreated: createdPage})
    return createdPage;
  }
}
