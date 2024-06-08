import { Module } from '@nestjs/common';
import { UserModule } from './user/module';
import { AuthModule } from './auth/module';
import { RoleModule } from './role/module';

@Module({
  imports: [AuthModule, RoleModule, UserModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class ApiModule {}
