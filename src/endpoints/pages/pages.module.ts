import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { PagesResolvers } from "./pages.resolvers";
import { PagesService } from "./pages.service";

@Module({

  providers: [PagesResolvers,PagesService],
  imports: [PrismaModule]
})

export class PagesModule{}
