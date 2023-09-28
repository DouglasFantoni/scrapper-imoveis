import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
// import { Imovel, Website } from "@prisma/client";
import { Website } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";
import { Imovel, ImovelResponse, NewImovel } from "./../../graphql.schema";
import { ImoveisService } from "./imoveis.service";

const pubSub = new PubSub();

export type ImovelWithWebsite = Imovel & { website: Website };

@Resolver("Imoveis")
export class ImoveisResolvers {
	constructor(private readonly imoveisService: ImoveisService) {}

	@Query("imoveis")
	async imoveis(): Promise<ImovelWithWebsite[]> {
		return this.imoveisService.findAll();
	}

	@Query("removeAllImoveis")
	async removeAll(): Promise<void> {
		return this.imoveisService.removeAll();
	}

	@Query("find")
	async searchImoveis(): Promise<ImovelResponse[]> {
		const imoveisData = await this.imoveisService.searchImoveis();

		return imoveisData;
	}

	@Mutation("createImovel")
	async createImovel(@Args("imovel") imovel: NewImovel): Promise<Imovel> {
		const createdImovel = this.imoveisService.create(imovel);
		pubSub.publish("imovelCreated", { imovelCreated: createdImovel });
		return createdImovel;
	}
}
