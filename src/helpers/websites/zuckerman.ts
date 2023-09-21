import axios from "axios";
import cheerio from "cheerio";
import { ImovelDataDto } from '../../endpoints/imoveis/ImovelDataDto';
import { Website } from "../../graphql.schema";
import { convertImovelType, convertToNumber } from '../convertionsToTypes';


export const zuckerman = async (websiteData: Website, pagina: string) => {

    const imoveisData: ImovelDataDto[] = [];

    const url = `${websiteData.baseUrl}${pagina}`;

    return await axios.get(url).then(response => {

        const $ = cheerio.load(response.data);
        // console.log(response.data)

        const imoveis = $(".card-property.card_lotes_div");

        imoveis.each(function()  {
            const title = $(this).find('.card-property-address > span:last-of-type').text();

            const amount = $(this).find('.card-property-prices > li:last-of-type .card-property-price-value').text().replace(/[^0-9]/g,'')
            const status = ($(this).find('.cd-it-r2-1').text().toLowerCase().replace('Leilão ','')) ;
            const url = `${$(this).find('.card-property-image-wrapper > a').attr('href')}`;
            const image = `${$(this).find('.card-property-image-wrapper > a > img').attr('src')}`;
            const description = `${$(this).find('.card-property-image-wrapper > a > img').attr('alt')}`;
            const size = `${$(this).find('.card-property-info-label').text()}`;
            const type = `${$(this).find('.card-property-prices > li:first-of-type > span').text()}`;

            const imovelData: ImovelDataDto = {
                slug: url,
                title,
                amount: convertToNumber(amount),
                status,
                description,
                image,
                size,
                type: convertImovelType(type),
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
