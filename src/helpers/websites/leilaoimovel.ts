import { InternalServerErrorException } from "@nestjs/common";
import axios from "axios";
import cheerio from "cheerio";
import { ImovelDataDto } from "../../endpoints/imoveis/ImovelDataDto";
import { Website } from "../../graphql.schema";
import { convertImovelType, convertToNumber } from "../convertionsToTypes";
import { encrypt } from "../crypt";

export const leilaoimovel = async (websiteData: Website, pagina: string) => {
	const imoveisData: ImovelDataDto[] = [];

	const url = `${websiteData.baseUrl}${pagina}`;

	return await axios
		.get(url)
		.then((response) => {
			const $ = cheerio.load(response.data);

			const imoveis = $(".place-box");

			imoveis.each(function () {
				try {
					const title = `${$(this).find(".address > p > b").text()}`;
					const description = `${$(this).find(".address > p > span").text()}`;
					const amount = $(this).find(".discount-price").text();
					const status = $(this).find(".categories a").text().toLowerCase();
					const url = `${websiteData.baseUrl}${$(this)
						.find(".Link_Redirecter")
						.attr("href")}`;
					const image = `${$(this)
						.find(".Link_Redirecter > picture > img")
						.attr("src")}`;

					// As vezes existe um texto a consultar no valor
					const imovelValue = convertToNumber(amount);

					const slug = encrypt(`${title}${description}${amount}`);

					if (imovelValue) {
						const imovelData: ImovelDataDto = {
							slug,
							title,
							amount: imovelValue,
							status,
							description,
							image,
							type: convertImovelType(title),
							url,
						};

						imoveisData.push(imovelData);
					}
				} catch (error) {
					throw new InternalServerErrorException(
						{
							websiteData,
							pagina,
							url,
						},
						{
							description: "Erro ao pegar as informações do imovel",
							cause: error,
						}
					);
				}
			});

			return imoveisData.length > 0 ? imoveisData : [null];
		})
		.catch((err) => {
			throw new InternalServerErrorException(
				{
					websiteData,
					pagina,
					url,
				},
				{
					description: "Erro ao pegar as informações do imovel",
					cause: err,
				}
			);
		});
};

// {
//     id: 'amF2YXNjcmlwdDpkZXRhbGhlX2ltb3ZlbCgyNDAwMDg4MDQpOyByZXR1cm4gZmFsc2U7',
//     title: 'SAO JOSE DOS CAMPOS - MANTIQUEIRA I | R$ 76.700,00',
//     amount: 'R$ 76.700,00',
//     status: 'indefinido',
//     url: 'https://venda-imoveis.caixa.gov.br'
// },
