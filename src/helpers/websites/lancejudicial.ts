import axios from "axios";
import cheerio from "cheerio";
import { ImovelDataDto } from '../../endpoints/imoveis/ImovelDataDto';
import { Website } from "../../graphql.schema";
import { convertImovelType, convertToNumber } from '../convertionsToTypes';
import { encrypt } from "../crypt";

export const lancejudicial = async (
	websiteData: Website,
	pagina: string
): Promise<ImovelDataDto[]> => {
	const imoveisData: ImovelDataDto[] = [];

	const url = `${websiteData.baseUrl}${pagina}`;

	try {
		const response = await axios.get(url);
		const $ = cheerio.load(response.data);
		// console.log(response.data)
		const imoveis = $(".card-item");

		try {
			imoveis.each(function () {
				const title = `${$(this).find(".card-title").attr("title")}`;
				const amountText = $(this)
					.find(".card-price")
					.text()
					.replace(/[^0-9]/g, "");
				const status = $(this)
					.find(".card-info .float-left.text-uppercase a")
					.text()
					.toLowerCase();
				const image = `https:${$(this).find(".card-image").attr("data-bg")}`;
				const relativeUrl = `${$(this).find(".card-title").attr("href")}`;
				const fullImovelUrl = `${websiteData.baseUrl}${relativeUrl}`;
				const description = "";

				const imovelConverted = convertImovelType(title);
				const amount = convertToNumber(amountText);
				const slug = encrypt(`${title}${description}${amount}`);

				const imovelData: ImovelDataDto = {
					slug,
					title,
					amount,
					image,
					type: imovelConverted,
					description,
					status,
					url: fullImovelUrl,
				};

				imoveisData.push(imovelData);
			});
		} catch (error) {
			console.log("ERRO AO PEGAR AS INFORMAÇÕES DO IMOVEL", error);
		}
		return imoveisData.length > 0 ? imoveisData : [];
	} catch (err) {
		console.log("url", url);
		console.log(err);
	}

	return [];
};
