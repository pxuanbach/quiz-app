import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { User } from '../user/schema';
import TokenPayload from './token.interface';
import UserService from '../user/service';
import AuthConfig from '../../../config/auth/interface';

@Injectable()
export class JwtResetPasswordStrategy extends PassportStrategy(
  Strategy,
  'jwt-reset-password',
) {
  constructor(
    protected readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<AuthConfig>('auth').refreshTokenSecretKey,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    const resetPassToken = request.headers?.authorization
      .replace('Bearer', '')
      .trim();
    const result = await this.userService.getUserIfResetPasswordTokenMatches(
      resetPassToken,
      payload.sub,
    );
    return result;
  }
}
