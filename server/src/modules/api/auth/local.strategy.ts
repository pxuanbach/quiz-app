import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import AuthService from './service';
import { User } from '../user/schema';
import LogInDto from './dto/logIn.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      // usernameField: 'username',
      // passwordField: 'password',
    });
  }
  async validate(username: string, password: string): Promise<User> {
    const payload: LogInDto = { username, password };
    return await this.authService.getAuthenticatedUser(payload);
  }
}
