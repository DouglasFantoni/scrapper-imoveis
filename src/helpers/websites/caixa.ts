import axios from "axios";
import cheerio from "cheerio";
import * as https from "https";
import * as querystring from "querystring";
import { ImovelDataDto } from '../../endpoints/imoveis/ImovelDataDto';
import { Website } from "../../graphql.schema";
import { encrypt } from "../crypt";
import { getNumbers } from "../number";

export const caixa = async (websiteData: Website, pagina: string) => {

    const imoveisData: ImovelDataDto[] = [];

    const url = `${websiteData.baseUrl}${pagina}`;

    const params = querystring.stringify({
        hdn_estado: "SP",
        hdn_cidade: 9851,
        hdn_bairro:null,
        hdn_tp_venda: 0,
        hdn_tp_imovel:"Selecione",
        hdn_area_util:"Selecione",
        hdn_faixa_vlr:0,
        hdn_quartos:2,
        hdn_vg_garagem:"Selecione",
        strValorSimulador:null,
        strAceitaFGTS:null,
        strAceitaFinanciamento:null,
    });

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });

    return await axios.post(url, params, {
        headers: { 'content-type': 'application/x-www-form-urlencoded',

        },
        httpsAgent

    }).then(async response => {

        const $ = cheerio.load(response.data);
        console.log(response.data)

        const imoveis = $("input");

        let imoveisStr = ''

        imoveis.each(function()  {

            if ($(this).attr('id').includes('hdnImov')){
                imoveisStr += imoveisStr.length ? `||${$(this).val()}` : `${$(this).val()}`;
            }
            //

            // console.log('amount',amount)


        });

        await axios.post(`${websiteData.baseUrl}/sistema/carregaListaImoveis.asp`, querystring.stringify({
            hdnImov: imoveisStr
        }), {
            headers: { 'content-type': 'application/x-www-form-urlencoded'},
            httpsAgent
        }).then(response => {

            const $ = cheerio.load(response.data);

            const imoveisList = $('li.group-block-item');

            imoveisList.each(function()  {

                const title = $(this).find('span>strong>font').text();
                const slug = $(this).find('span>a').attr('onclick');
                const amount = getNumbers(title);
                const image =  $(this).find('div.fotoimovel-col1 > img').attr('src');
                const description =  $(this).find('.form-row.clearfix > .control-item font').text();
                const url = `${websiteData.baseUrl}`;

                const imovelData: ImovelDataDto = {
                    slug:  encrypt(`${slug}`),
                    image: websiteData.baseUrl+image,
                    description,
                    title,
                    amount: parseFloat(`${amount}`),
                    url
                }
                console.log('imovelData',imovelData)
                imoveisData.push(imovelData)

            });

        });


        return imoveisData.length > 0 ? imoveisData : [null];
    }).catch(err => {
        console.log('url',url)
        console.log(err)
        return [];

    });
}
