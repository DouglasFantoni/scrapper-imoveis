import axios from "axios";
import cheerio from "cheerio";
import {formataDinheiro} from "../number";
import {encrypt, getUniqueId} from "../crypt";
import { Imovel, Website } from "../../graphql.schema";

export const lancejudicial =  (websiteData: Website, pagina: string) => {

    const imoveisData: Imovel[] = [];

    const url = `${websiteData.baseUrl}${pagina}`;

    return  axios.get(url).then(response => {

        const $ = cheerio.load(response.data);
        // console.log(response.data)

        const imoveis = $(".card-item");

        imoveis.each(function()  {
            const title = `${$(this).find('.card-title').attr('title')}`
            const amount = $(this).find('.card-price').text().replace(/[^0-9]/g,'');
            const status = ($(this).find('.card-info .float-left.text-uppercase a').text().toLowerCase());
            const image = `https:${$(this).find('.card-image').attr('data-bg')}`;
            const url = `${websiteData.baseUrl}${$(this).find('.card-title').attr('href')}`;

            const imovelData: Imovel = {
                slug:  encrypt(`${url}`),
                title,
                amount: (parseFloat(amount)),
                image,
                status,
                url
            }
            console.log('imovelData',imovelData)

            imoveisData.push(imovelData)
        });
        console.log('imoveisData',imoveisData.length > 0 ? imoveisData : [null])

        return imoveisData.length > 0 ? imoveisData : [null];
    }).catch(err => {
        console.log('url',url)
        console.log(err)
    });
}
