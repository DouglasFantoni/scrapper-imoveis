import { Module } from "@nestjs/common";
import { ImoveisResolvers } from "./imoveis.resolvers";
import { ImoveisService } from "./imoveis.service";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({

  providers: [ImoveisResolvers,ImoveisService],
  imports: [PrismaModule]
})

export class ImoveisModule{}
