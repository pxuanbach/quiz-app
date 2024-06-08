import { Module } from '@nestjs/common';
import { UserModule } from './user/module';
import { AuthModule } from './auth/module';
import { RoleModule } from './role/module';
import { QuizModule } from './quiz/module';

@Module({
  imports: [AuthModule, RoleModule, UserModule, QuizModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class ApiModule {}
