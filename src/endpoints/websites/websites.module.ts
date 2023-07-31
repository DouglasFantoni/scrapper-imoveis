import { Module } from "@nestjs/common";
import { WebsitesResolvers } from "./websites.resolvers";
import { WebsitesService } from "./websites.service";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({

  providers: [WebsitesResolvers,WebsitesService],
  imports: [PrismaModule]
})

export class WebsitesModule {}
