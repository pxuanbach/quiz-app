import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
// import { VocabularyGraphqlModule } from './vocabulary/module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/modules/graphql/schema.gql'),
    }),
    // VocabularyGraphqlModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class GraphqlModule {}
