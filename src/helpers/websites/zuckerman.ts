import axios from "axios";
import cheerio from "cheerio";
import {formataDinheiro} from "../number";
import {encrypt, getUniqueId} from "../crypt";
import { Imovel, Website } from "../../graphql.schema";


export const zuckerman =  (websiteData: Website, pagina: string) => {

    const imoveisData: Imovel[] = [];

    const url = `${websiteData.baseUrl}${pagina}`;

    return  axios.get(url).then(response => {

        const $ = cheerio.load(response.data);
        // console.log(response.data)

        const imoveis = $(".list-items");

        imoveis.each(function()  {
            const title = $(this).find('.card-property-address > span:last-of-type').text();

            const amount = $(this).find('.card-property-prices > li:last-of-type .card-property-price-value').text().replace(/[^0-9]/g,'')
            const status = ($(this).find('.cd-it-r2-1').text().toLowerCase().replace('Leilão ','')) ;
            const url = `${$(this).find('.card-property-image-wrapper > a').attr('href')}`;
            const image = `${$(this).find('.card-property-image-wrapper > a > img').attr('src')}`;
            const size = `${$(this).find('.card-property-info-label').text()}`;

            console.log('amount',amount)

            const imovelData: Imovel = {
                slug:  encrypt(`${url}`),
                title,
                amount: parseFloat(amount),
                status,
                image,
                size,
                url
            }

            imoveisData.push(imovelData)
        });

        return imoveisData.length > 0 ? imoveisData : [null];
    }).catch(err => {
        console.log('url',url)
        console.log(err)
    });
}
