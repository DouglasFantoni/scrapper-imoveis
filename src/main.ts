import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import serverlessExpress from "@vendia/serverless-express";
import { Context, Handler } from "aws-lambda";
import express from "express";
import { AppModule } from "./app.module";
import { ImoveisService } from "./endpoints/imoveis/imoveis.service";

let cachedServer: Handler;

async function bootstrap() {
	if (!cachedServer) {
		const expressApp = express();
		const nestApp = await NestFactory.create(
			AppModule,
			new ExpressAdapter(expressApp)
		);

		nestApp.enableCors();

		await nestApp.init();

		cachedServer = serverlessExpress({ app: expressApp });
	}

	return cachedServer;
}

export const handler = async (event: any, context: Context, callback: any) => {
	const server = await bootstrap();

	if (event.source === "serverless-plugin-warmup") {
		console.log("WarmUp - Lambda warmed!");
		return {};
	}

	return server(event, context, callback);
};

export const callFindProperties = async () => {
	try {
		const app = await NestFactory.createApplicationContext(AppModule);
		const myService = app.get(ImoveisService);

		const response = await myService.findAll();
		await app.close();

		return {
			statusCode: 200,
			body: JSON.stringify({ message: response }),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: `Erro ao buscar os imoveis:  ${
					error.message ?? "Erro desconhecido"
				}`,
			}),
		};
	}
};