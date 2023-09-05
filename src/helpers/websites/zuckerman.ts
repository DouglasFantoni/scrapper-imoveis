import axios from "axios";
import cheerio from "cheerio";
import { ImovelDataDto } from '../../endpoints/imoveis/ImovelDataDto';
import { Website } from "../../graphql.schema";
import { encrypt } from "../crypt";


export const zuckerman = async (websiteData: Website, pagina: string) => {

    const imoveisData: ImovelDataDto[] = [];

    const url = `${websiteData.baseUrl}${pagina}`;

    return await axios.get(url).then(response => {

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

            const imovelData: ImovelDataDto = {
                slug:  encrypt(`${url}`),
                title,
                amount: parseFloat(amount),
                status,
                description: '  ',
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
        return [];

    });
}
