import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AdminModule } from './endpoints/admin/admin.module';
import { ImoveisModule } from "./endpoints/imoveis/imoveis.module";
import { PagesModule } from './endpoints/pages/pages.module';
import { PostsModule } from './endpoints/posts/posts.module';
import { WebsitesModule } from "./endpoints/websites/websites.module";

@Module({
  imports: [
    PostsModule,
    WebsitesModule,
    ImoveisModule,
    PagesModule,
    AdminModule,
    
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
  ],
})
export class AppModule {}
