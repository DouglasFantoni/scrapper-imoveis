import { InternalServerErrorException } from "@nestjs/common";
import { caixa } from "src/helpers/websites/caixa";
import { lancejudicial } from "src/helpers/websites/lancejudicial";
import { leilaoimovel } from "src/helpers/websites/leilaoimovel";
import { Website } from "./../../graphql.schema";
import { zuckerman } from "./../../helpers/websites/zuckerman";
import { ImovelDataDto } from "./ImovelDataDto";

export async function scrappImoveis(
	websiteData: Website
): Promise<ImovelDataDto[]> {
	try {
		const results = await Promise.all(
			websiteData.pages.map((page) =>
				fetchFromSlug(websiteData.slug, websiteData, page.relativeUrl)
			)
		);

		// Filtrar os resultados não desejados e achatar os arrays
		return results.flat().filter((res) => typeof res !== "symbol");
	} catch (e) {
		throw new InternalServerErrorException(websiteData, {
			description: "Erro ao buscar o imovel",
		});
	}
}

const fetchFromSlug = async (
	slug: string,
	data: Website,
	url: string
): Promise<ImovelDataDto[] | []> => {
	switch (slug) {
		case "lance-judicial":
			return await lancejudicial(data, url);
		case "leilao-imovel":
			return await leilaoimovel(data, url);
		case "zuckerman":
			return (await zuckerman(data, url)) as ImovelDataDto[];
		case "caixa":
			return (await caixa(data, url)) as ImovelDataDto[];
		default:
			throw new InternalServerErrorException(slug, {
				description: "A página buscada não existe",
			});
	}
};
