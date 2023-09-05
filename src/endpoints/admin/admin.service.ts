import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";



@Injectable()
export class AdminService{
  constructor(private prisma: PrismaService) {}

  async removeAll(): Promise<void> {

    const res = await this.prisma.imovel.deleteMany({ });
    const res3 = await this.prisma.page.deleteMany({ });
    const res2 = await this.prisma.website.deleteMany({ });
  }

}
