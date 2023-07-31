import { Query, Resolver } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { ImoveisService } from "./imoveis.service";
import { Imovel } from "../../graphql.schema";

const pubSub = new PubSub();

@Resolver('Imoveis')
export class ImoveisResolvers {

  constructor(private readonly imoveisService: ImoveisService) {}

  @Query('imoveis')
  async imoveis(): Promise<Imovel[]>{
    return this.imoveisService.findAll();
  }
}
