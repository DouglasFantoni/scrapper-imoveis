import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Imovel } from '@prisma/client';



@Injectable()
export class ImoveisService{
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Imovel[]> {

    return this.prisma.imovel.findMany();
  }


}
