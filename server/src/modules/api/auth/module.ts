import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from '../user/module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import AuthController from './controller';
import AuthService from './service';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshStrategy } from './jwtRefresh.strategy';
import { LocalStrategy } from './local.strategy';
import { JwtVerifyStrategy } from './jwtVerify.strategy';
import { JwtResetPasswordStrategy } from './jwtResetPass.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({}),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    LocalStrategy,
    JwtVerifyStrategy,
    JwtResetPasswordStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
