import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";


@Injectable()
class SearchService {
  constructor(private prisma: PrismaService) {
  }

  async searchImoveis(): Promise<null>{

    this.prisma.website.findMany().then(websites => {

    })

    return null;
  }
}
