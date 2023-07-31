import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PostsModule } from './endpoints/posts/posts.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { WebsitesModule } from "./endpoints/websites/websites.module";
import { ImoveisModule } from "./endpoints/imoveis/imoveis.module";

@Module({
  imports: [
    PostsModule,
    WebsitesModule,
    ImoveisModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
  ],
})
export class AppModule {}
