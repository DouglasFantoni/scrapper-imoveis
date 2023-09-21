import { Imovel } from "src/graphql.schema";
import { formataDinheiro } from "./number";

const imovelOptionalDataText = (imovelData: Imovel): string => {

		let str = "";

		imovelData.size &&
			(str += `<b>Metragem:</b> ${imovelData.size}
`);
		imovelData.type &&
			(str += `<b>Tipo:</b> ${imovelData.type}
`);
		imovelData.status &&
			(str += ` <b>Status:</b> ${imovelData.status}
`);
		imovelData.description &&
			(str += `<b>${imovelData.description}</b>
`);

		return str;
}

export function stripHtmlTags(input: string): string {
    return input.replace(/<\/?[^>]+(>|$)/g, "");
}

export const imovelText = (imovelData: Imovel, websiteName: string): string | null => {

	try {
		const text = `

		<span class="tg-spoiler">${imovelData.image}</span>
		<b>Site: </b>${websiteName}
		<b>Nome: </b> ${imovelData.title.replace(
				/[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
				""
			)}
		<b>Valor: </b> ${formataDinheiro(imovelData.amount)}
		${imovelOptionalDataText(imovelData)}
		<b>Link:</b> ${imovelData.url}
		`

		return text;
	} catch (error) {
		console.log('ERRO EM text AO PEGAR O SEGUINTE IMOVEL: ',imovelData);
		
		return null;
	}
};

export const imovelNotFoundText = (siteName: string) => {
	return `
<b>${siteName}</b>

Nenhum imóvel novo encontrado`;
};
