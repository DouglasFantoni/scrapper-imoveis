import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { WEBSITES_MAPEADOS } from "../../constants/WebsitesMapeados";
import { MAX_VALUE } from "../../constants/filters";
import { Imovel, NewWebsite, Page, Website } from "../../graphql.schema";


@Injectable()
export class WebsitesService {
  constructor(private prisma: PrismaService) {}

  async create(website: NewWebsite): Promise<Website> {

    const data =  this.prisma.website.create({
      data: {
        ...website,
        pages: {
          create: website.pages
        }
      },
      // skipDuplicates: true,
    })

    return data;
  }

  async getAll(): Promise<Website[]> {

    return this.prisma.website.findMany()
  }


}
