import { Imovel } from "../graphql.schema";

export const imovelText = (imovelData: Imovel) => {

    // ${(parseFloat(imovelData.amount.slice(0, imovelData.amount.length -2))).toLocaleString('pt-BR', {
    //         minimumFractionDigits: 2,
    //         style: 'currency', currency: 'BRL'
    //     }) }

    const optionalData = () => {

        let str = '';

        imovelData.size && (str +=  `<b>Metragem: ${imovelData.size}</b>
`);
        imovelData.type && (str +=  `<b>Tipo: ${imovelData.type}</b>
`);
        imovelData.status && (str += `<b>Status: ${imovelData.status}</b>
`);
        imovelData.description && (str +=  `<b>${imovelData.description}</b>
`);

        return str.length ? `
        ${str}
        ` : '';
    }

    return `

<span class="tg-spoiler">${imovelData.image}</span>

<b>Nome: </b> ${imovelData.title.replace(/[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, '')}

<b>Valor: </b> ${imovelData.amount}
${optionalData()}
<b>Link:</b>${imovelData.url}
`;
}

export const imovelNotFoundText = (siteName: string) => {

    return `
<b>${siteName}</b>

Nenhum imóvel novo encontrado`;
}
