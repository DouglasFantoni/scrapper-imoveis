import { InternalServerErrorException } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import serverlessExpress from "@vendia/serverless-express";
import { Context, Handler } from "aws-lambda";
import express from "express";
import { AppModule } from "./app.module";
import { ImoveisResolvers } from "./endpoints/imoveis/imoveis.resolvers";
import { ErrorHandler } from "./helpers/ErrorHandler";

let cachedServer: Handler;

async function bootstrap() {
	if (!cachedServer) {
		const expressApp = express();
		const nestApp = await NestFactory.create(
			AppModule,
			new ExpressAdapter(expressApp)
		);

		nestApp.enableCors();

		nestApp.useGlobalFilters(new ErrorHandler());

		await nestApp.init();

		cachedServer = serverlessExpress({ app: expressApp });
	}

	return cachedServer;
}

export const handler = async (event: any, context: Context, callback: any) => {
	const server = await bootstrap();

	return server(event, context, callback);
};

export const callFindProperties = async () => {
	try {
		const app = await NestFactory.createApplicationContext(AppModule);
		const myService = app.get(ImoveisResolvers);

		const response = await myService.searchImoveis();
		await app.close();

		return {
			statusCode: 200,
			body: { data: response },
		};
	} catch (error) {
		throw new InternalServerErrorException(error, {
			description: "Erro ao buscar os imoveis",
		});
	}
};
