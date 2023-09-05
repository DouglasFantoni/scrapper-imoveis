import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { AdminResolvers } from './admin.resolvers';
import { AdminService } from "./admin.service";

@Module({

  providers: [AdminResolvers,AdminService],
  imports: [PrismaModule]
})

export class AdminModule{}
