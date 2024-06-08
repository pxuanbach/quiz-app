import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    ApiModule,
    // GraphqlModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ModulesModule {}
