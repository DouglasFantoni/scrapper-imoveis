import { Injectable } from "@nestjs/common";
import TelegramMessager from "src/helpers/TelegramMessager";
import { imovelText } from "src/helpers/text";
import { PrismaService } from "../../prisma/prisma.service";
import { Imovel, NewImovel } from './../../graphql.schema';
import { ImovelWithWebsite } from './imoveis.resolvers';
import { scrappImoveis } from './scrappImoveis';



@Injectable()
export class ImoveisService{
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<ImovelWithWebsite []> {

    return this.prisma.imovel.findMany({
      include: {
        website: true
      }
    });
  }

  async removeAll(): Promise<void>{
    
    const res = await this.prisma.imovel.deleteMany({ });
    
  }

  async create(imovel: NewImovel): Promise<Imovel> {
    return this.prisma.imovel.create({
      data: {
        ...imovel
      },
      include: {
        website: true
      }
    })
  }

  async searchImoveis(): Promise<void> {

    const websites = await this.prisma.website.findMany({
      where: {
        isActive: true
      },
      include: {
        imoveis: true,
        pages: true,
      }
    });

    console.log(websites);
    
    const TelegramObject = new TelegramMessager();

    websites.map( async website => {

      const {baseUrl, id, imoveis, name, isActive, pages, slug} = website

      const imoveisScrapped = await scrappImoveis({
          ...website,
          imoveis: [],
      })
      console.log('imoveisScrapped',imoveisScrapped);

      Promise.all(imoveisScrapped.map( async imovelScrapped => {

        let imovelExists = imoveis.find(imovel => imovel.slug === imovelScrapped.slug);
        let imovelSynced: Imovel;
        console.log('imovelExists',imovelExists);

        try {
                  // é update
          if (imovelExists){

            // Se teve alteração de valor ele é atualizado. Senão ele é ignorado
            if (imovelExists.amount !== imovelScrapped.amount){
              imovelSynced = await this.prisma.imovel.update({
                data: {
                  ...imovelScrapped,
                },
                where: {
                  id: imovelExists.id
                }
              })
            }

            // é criação
          } else {
            imovelSynced = await this.create({
              ...imovelScrapped,
              websiteId: website.id
            });
          }
        } catch (error) {
          console.log('Erro ao criar/atualizar o seguinte imovel: ', imovelExists);
          console.log('Com o seguinte erro:', error);
        }

        // Se houve alguma alteração ou criação é enviado um aviso ao bot
        if (imovelSynced){

          await TelegramObject.sendMessage(imovelText(imovelSynced));
        }

      }));
    })

  }
}
