import { Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import TelegramMessager from "src/helpers/TelegramMessager";
import { imovelText } from "src/helpers/text";
import { MAX_RETRIES } from "../../constants/configs";
import { PrismaService } from "../../prisma/prisma.service";
import { Imovel, NewImovel } from "./../../graphql.schema";
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

	async searchImoveis(): Promise<void> {
		const websites = await this.prisma.website.findMany({
			where: {
				isActive: true,
			},
			include: {
				imoveis: true,
				pages: true,
			},
		});

		console.log(websites);

		const TelegramObject = new TelegramMessager();

		await Promise.all(
			websites.map(async (website) => {
				let delay = 1000; // Começando com meio segundo

				const imoveisScrapped = await scrappImoveis({
					...website,
					imoveis: [],
				});
				// console.log('imoveisScrapped',imoveisScrapped);

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
						// console.log('imovelExists',imovelExists);

						try {
							// é update
							if (imovelExists) {
								// Se teve alteração de valor ele é atualizado. Senão ele é ignorado
								if (imovelExists.amount !== imovelScrapped.amount) {
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
								imovelSynced = await this.create({
									...imovelScrapped,
									websiteId: website.id,
								});
							}
						} catch (error) {
							console.log(
								"Erro ao criar/atualizar o seguinte imovel: ",
								website.name,
								imovelExists || imovelScrapped
							);
							if (error instanceof PrismaClientKnownRequestError) {
								// The .code property can be accessed in a type-safe manner
								console.log("Com o seguinte erro TRATADO:");
								console.log(error.message, error.stack);
							}
							console.log("Com o seguinte erro BRUTO:", error);
						}

						// Se houve alguma alteração ou criação é enviado um aviso ao bot
						if (imovelSynced) {
							let retryCount = 0;
							while (retryCount < MAX_RETRIES) {
								try {
									console.log(imovelText(imovelSynced, website.name));

									await TelegramObject.sendMessage(
										imovelText(imovelSynced, website.name)
									);
									console.log("ENVIOU");

									break;
								} catch (error) {
									// if (error.message.contains('Too Many Requests') || error.response.statusMessage.contains('Too Many Requests')) {
									await new Promise((res) => setTimeout(res, delay));
									delay *= 2; // Dobra o tempo de espera para a próxima retentativa
									retryCount++;
									// } else {
									// console.log(error);
									console.log("MENSAGEM: ", error.response.body.description);
									// }
								}
							}
						}
					})
				);

				return null;
			})
		);
	}
}
