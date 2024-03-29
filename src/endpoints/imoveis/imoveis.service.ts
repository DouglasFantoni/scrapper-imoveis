import { Injectable, InternalServerErrorException } from "@nestjs/common";
import TelegramMessager from "src/helpers/TelegramMessager";
import { imovelText } from "src/helpers/text";
import { MAX_RETRIES } from "../../constants/configs";
import { PrismaService } from "../../prisma/prisma.service";
import { Imovel, ImovelResponse, NewImovel } from "./../../graphql.schema";
import { ImovelDataDto } from "./ImovelDataDto";
import { ImovelWithWebsite } from "./imoveis.resolvers";
import { scrappImoveis } from "./scrappImoveis";

@Injectable()
export class ImoveisService {
	constructor(private prisma: PrismaService) {}

	async findAll(): Promise<ImovelWithWebsite[]> {
		return this.prisma.imovel.findMany({
			include: {
				website: true,
			},
		});
	}

	async removeAll(): Promise<void> {
		const res = await this.prisma.imovel.deleteMany({});
	}

	async create(imovel: NewImovel): Promise<Imovel> {
		return this.prisma.imovel.create({
			data: {
				...imovel,
			},
			include: {
				website: true,
			},
		});
	}

	async searchImoveis(): Promise<ImovelResponse[]> {
		const websites = await this.prisma.website.findMany({
			where: {
				isActive: true,
			},
			include: {
				imoveis: true,
				pages: true,
			},
		});

		const imoveisFinded: ImovelDataDto[] = [];

		const TelegramObject = new TelegramMessager();

		await Promise.all(
			websites.map(async (website) => {
				let delay = 1000; // Começando com 1 segundo

				const imoveisScrapped = await scrappImoveis({
					...website,
					imoveis: [],
				});

				// Remove os imoveis indesejados
				const imoveisSelecteds = imoveisScrapped.filter(
					(imovel) => !imovel.type || imovel.type !== "Desconhecido"
				);

				await Promise.all(
					imoveisSelecteds.map(async (imovelScrapped) => {
						let imovelExists = website.imoveis.find(
							(imovel) => imovel.slug === imovelScrapped.slug
						);
						let imovelSynced: Imovel;

						try {
							// é update
							if (imovelExists) {
								// Se teve alteração de valor ele é atualizado. Senão ele é ignorado
								if (imovelExists.amount !== imovelScrapped.amount) {
									imoveisFinded.push(imovelScrapped);

									imovelSynced = await this.prisma.imovel.update({
										data: {
											...imovelScrapped,
										},
										where: {
											id: imovelExists.id,
										},
									});
								}

								// é criação
							} else {
								imoveisFinded.push(imovelScrapped);
								imovelSynced = await this.create({
									...imovelScrapped,
									websiteId: website.id,
								});
							}
						} catch (error) {
							throw new InternalServerErrorException(
								imovelExists || imovelScrapped,
								{
									description: "Erro ao criar/atualizar o seguinte imovel",
								}
							);
						}

						// Se houve alguma alteração ou criação é enviado um aviso ao bot
						if (imovelSynced) {
							let retryCount = 0;
							while (retryCount < MAX_RETRIES) {
								try {
									await TelegramObject.sendMessage(
										imovelText(imovelSynced, website.name)
									);

									break;
								} catch (error) {
									// if (error.message.contains('Too Many Requests') || error.response.statusMessage.contains('Too Many Requests')) {
									// console.log("MENSAGEM: ", error.response.body.description);
									await new Promise((res) => setTimeout(res, delay));
									delay += 10000; // Aumenta em 10 segundos a espera retentativa
									retryCount++;
								}
							}
						}
					})
				);
			})
		);
		return imoveisFinded;
	}
}
