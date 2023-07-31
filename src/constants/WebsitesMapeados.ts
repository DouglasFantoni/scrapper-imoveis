import {MAX_VALUE} from "./filters";

export const WEBSITES_MAPEADOS  = [
    {
        slug: 'lancejudicial',
        nome: 'Lance Judicial',
        baseUrl: 'https://www.lancejudicial.com.br',
        pages: [
            `/imoveis/sp/sao-jose-dos-campos?&value_max=${MAX_VALUE}`,
            `/imoveis/sp/jacarei?&value_max=${MAX_VALUE}`
        ]
    },
    {
        slug: 'leilaoimovel',
        nome: 'Leilão Imovel',
        baseUrl: 'https://www.leilaoimovel.com.br',
        pages: [
            `/encontre-seu-imovel?s=&cidade=3549904&desocupado=&preco_max=${MAX_VALUE}`,
        ]
    },    {
        slug: 'zuckerman',
        nome: 'Zuckerman',
        baseUrl: 'https://www.portalzuk.com.br',
        pages: [
            `/leilao-de-imoveis/c/todos-imoveis/sp/interior/jacarei?dormitorios=0&metragemInicio=0&metragemFim=0&vagas-garagem=0&ocupacao=todos&precoInicio=52500&precoFim=${MAX_VALUE}&dataleilao=0&comitente=0`,
            `/leilao-de-imoveis/c/todos-imoveis/sp/interior/sao-jose-dos-campos?dormitorios=0&metragemInicio=0&metragemFim=0&vagas-garagem=0&ocupacao=todos&precoInicio=52500&precoFim=${MAX_VALUE}&dataleilao=0&comitente=0`,
            // '/leilao-de-imoveis/c/todos-imoveis/sp/interior/jacarei',
            // '/leilao-de-imoveis/sp/interior/sao-jose-dos-campos',

        ]
    },
    {
        slug: 'caixa',
        nome: 'Caixa Economica Federal',
        baseUrl: 'https://venda-imoveis.caixa.gov.br',
        pages: [
            '/sistema/carregaPesquisaImoveis.asp',
        ]
    }
]
