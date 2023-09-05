import axios from "axios";
import cheerio from "cheerio";
import { ImovelDataDto } from '../../endpoints/imoveis/ImovelDataDto';
import { Website } from "../../graphql.schema";
import { encrypt } from "../crypt";

export  const leilaoimovel = async (websiteData: Website, pagina: string) => {

    const imoveisData: ImovelDataDto[] = [];

    const url = `${websiteData.baseUrl}${pagina}`;

    return await axios.get(url).then(response => {

        const $ = cheerio.load(response.data);
        // console.log(response.data)

        const imoveis = $(".place-box");

        imoveis.each(function()  {
            const title = `${$(this).find('b').text()}`
            const amount = $(this).find('.discount-price').text().replace(/[^0-9]/g,'');
            const status = ($(this).find('.categories a').text().toLowerCase()) ;
            const url = `${websiteData.baseUrl}${$(this).find('.Link_Redirecter').attr('href')}`;
            const image = `${$(this).find('.Link_Redirecter > picture > img').attr('src')}`;

            const imovelData: ImovelDataDto = {
                slug:  encrypt(`${url}`),
                title,
                amount: parseFloat(amount),
                status,
          
                description: '  ',
                

                image,
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


// {
//     id: 'amF2YXNjcmlwdDpkZXRhbGhlX2ltb3ZlbCgyNDAwMDg4MDQpOyByZXR1cm4gZmFsc2U7',
//     title: 'SAO JOSE DOS CAMPOS - MANTIQUEIRA I | R$ 76.700,00',
//     amount: 'R$ 76.700,00',
//     status: 'indefinido',
//     url: 'https://venda-imoveis.caixa.gov.br'
// },

