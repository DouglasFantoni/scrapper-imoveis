import axios from "axios";
import cheerio from "cheerio";
import {formataDinheiro} from "../number";
import {encrypt, getUniqueId} from "../crypt";
import { Imovel, Website } from "../../graphql.schema";

export const leilaoimovel =  (websiteData: Website, pagina: string) => {

    const imoveisData: Imovel[] = [];

    const url = `${websiteData.baseUrl}${pagina}`;

    return  axios.get(url).then(response => {

        const $ = cheerio.load(response.data);
        // console.log(response.data)

        const imoveis = $(".place-box");

        imoveis.each(function()  {
            const title = `${$(this).find('b').text()}`
            const amount = $(this).find('.discount-price').text().replace(/[^0-9]/g,'');
            const status = ($(this).find('.categories a').text().toLowerCase()) ;
            const url = `${websiteData.baseUrl}${$(this).find('.Link_Redirecter').attr('href')}`;
            const image = `${$(this).find('.Link_Redirecter > picture > img').attr('src')}`;

            const imovelData: Imovel = {
                slug:  encrypt(`${url}`),
                title,
                amount: parseFloat(amount),
                status,
                image,
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


// {
//     id: 'amF2YXNjcmlwdDpkZXRhbGhlX2ltb3ZlbCgyNDAwMDg4MDQpOyByZXR1cm4gZmFsc2U7',
//     title: 'SAO JOSE DOS CAMPOS - MANTIQUEIRA I | R$ 76.700,00',
//     amount: 'R$ 76.700,00',
//     status: 'indefinido',
//     url: 'https://venda-imoveis.caixa.gov.br'
// },

