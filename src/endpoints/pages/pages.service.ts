import { Injectable } from "@nestjs/common";
import { NewPage, Page } from '../../graphql.schema';
import { PrismaService } from "../../prisma/prisma.service";



@Injectable()
export class PagesService{
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Page[]> {

    return this.prisma.page.findMany({
      include: {
        website: true
      }
    });
  }

  async create(page: NewPage): Promise<Page> {

    console.log('page',page);
    
    return this.prisma.page.create({
      data: {
        ...page
      },
      include: {
        website: true
      }
    })
  }
}
