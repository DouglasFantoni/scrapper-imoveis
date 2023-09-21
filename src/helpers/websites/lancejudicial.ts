import axios from "axios";
import cheerio from "cheerio";
import { ImovelDataDto } from '../../endpoints/imoveis/ImovelDataDto';
import { Website } from "../../graphql.schema";
import { convertImovelType, convertToNumber } from '../convertionsToTypes';

export const lancejudicial = async (websiteData: Website, pagina: string): Promise<ImovelDataDto[]> => {

    const imoveisData: ImovelDataDto[] = [];

    const url = `${websiteData.baseUrl}${pagina}`;

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        // console.log(response.data)
        const imoveis = $(".card-item");

        try {
            imoveis.each(function () {
                const title = `${$(this).find('.card-title').attr('title')}`;
                const amount = $(this).find('.card-price').text().replace(/[^0-9]/g, '');
                const status = ($(this).find('.card-info .float-left.text-uppercase a').text().toLowerCase());
                const image = `https:${$(this).find('.card-image').attr('data-bg')}`;
                const relativeUrl = `${$(this).find('.card-title').attr('href')}`;
                const fullImovelUrl = `${websiteData.baseUrl}${relativeUrl}`;

                const imovelConverted = convertImovelType(title);

                    const imovelData: ImovelDataDto = {
                        slug: fullImovelUrl,
                        title,
                        amount: convertToNumber(amount),
                        image,
                        type: imovelConverted,
                        description: '  ',
                        status,
                        url: fullImovelUrl,
                    };

                    imoveisData.push(imovelData);
            });
        } catch (error) {
            console.log('ERRO AO PEGAR AS INFORMAÇÕES DO IMOVEL', error);

        }
        console.log('imoveisData', imoveisData.length > 0 ? imoveisData : [null]);
        return imoveisData.length > 0 ? imoveisData : [];
    } catch (err) {
        console.log('url', url);
        console.log(err);
    }

    return [];
}
