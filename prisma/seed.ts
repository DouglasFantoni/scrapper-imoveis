import { PrismaClient } from "@prisma/client";
import websitesData from "./seeds/websites.json";
// const options = {
// 	environment: { type: "string" },
// };

const prisma = new PrismaClient();
async function main() {
	//   const {
	// 		values: { environment },
	// 	} = parseArgs({ options });

	//   switch (environment) {
	// 			case "development":
	// 				/** data for your development */
	// 				break;
	// 			case "test":
	// 				/** data for your test environment */
	// 				break;
	// 			default:
	// 				break;
	// 		}

	// Adiciona os websites basicos

	websitesData.forEach(async (website) => {
		await prisma.website.create({
			data: {
				...website,
				pages: {
					createMany: { data: [...website.pages] },
				},
			},
		});
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
