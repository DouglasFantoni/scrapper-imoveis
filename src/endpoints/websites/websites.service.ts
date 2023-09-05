import { Injectable } from "@nestjs/common";
import { Imovel, NewWebsite, Page, Website } from "../../graphql.schema";
import { PrismaService } from "../../prisma/prisma.service";


@Injectable()
export class WebsitesService {
  constructor(private prisma: PrismaService) {}

  async create(website: NewWebsite): Promise<Website> {

    const data =  this.prisma.website.create({
      data: {
        ...website,
        pages:  {
          create: website.pages
        }
        // pages: website.pages.map(page => {

        //   return this.prisma.page.create({

        //   })
        // }),
      },
      include: {
        pages: true,
        imoveis: true
      }
      // skipDuplicates: true,
    })

    return data;
  }

  async getAll(): Promise<(Website & { imoveis: Imovel[]; pages: Page[]; })[]> {

    return this.prisma.website.findMany({
      include: {
        pages: true,
        imoveis: true
      }
    })
  }


}
