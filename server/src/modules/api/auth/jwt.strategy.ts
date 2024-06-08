import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import UserService from '../user/service';
import AuthConfig from '../../../config/auth/interface';
import TokenPayload from './token.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<AuthConfig>('auth').accessTokenSecretKey,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    if (!payload.sub) {
      throw new UnauthorizedException();
    }
    const accessToken = request.headers?.authorization
      .replace('Bearer', '')
      .trim();
    const user = await this.userService.getUserIfAccessTokenMatches(
      accessToken,
      payload.sub,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
