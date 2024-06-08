import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { AuthenticateDTO } from './dto/authenticate.dto';
import { sign } from 'jsonwebtoken';
import { jwtConfig } from 'src/config/jwt.config';
import User from '../users/entities/User';
import { UserRepository } from '../users/users.repository';
import { JwtPayload } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async comparePassword(
    password: string,
    hash_password: string,
  ): Promise<boolean> {
    const password_hash = await compare(password, hash_password);

    return password_hash;
  }

  async signIn(
    data: AuthenticateDTO,
  ): Promise<{
    user: User;
    accessToken: string;
  }> {
    const userExists = await this.userRepository.findOne({
      where: {
        username: data.username,
      },
    });

    if (!userExists) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'User not exists!',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordMached = await this.comparePassword(
      data.password,
      userExists.password,
    );

    if (!passwordMached) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Password email/password combination!',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    delete userExists.password;

    const payload: JwtPayload = { username: userExists.username };
    const accessToken = this.jwtService.sign(payload);

    return {
      user: userExists,
      accessToken,
    };
  }
}
