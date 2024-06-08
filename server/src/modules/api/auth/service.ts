import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  NotFoundException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import LogInDto from './dto/logIn.dto';
import UserService from '../user/service';
import AuthConfig from '../../../config/auth/interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import TokenPayload from './token.interface';
import RegisterDto from './dto/register.dto';
import ChangePasswordDto from './dto/changePassword.dto';

@Injectable()
class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(payload: RegisterDto) {
    const hashedPassword = await this.hashPassword(payload.password);
    try {
      const createdUser = await this.userService.create({
        ...payload,
        hashedPassword: hashedPassword,
      });
      createdUser.hashedPassword = undefined;
      await this.onAfterRegister(createdUser._id.toString(), createdUser.email);
      return createdUser;
    } catch (error) {
      if (error?.code === 11000) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        `Something went wrong: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(payload: LogInDto) {
    try {
      const user = await this.userService.getByEmail(payload.username);
      if (!user) {
        throw new HttpException(
          'User with this email does not exist.',
          HttpStatus.NOT_FOUND,
        );
      }
      if (!user.security.verified) {
        throw new UnauthorizedException();
      }
      await this.verifyPassword(payload.password, user.hashedPassword);
      return user;
    } catch (error) {
      Logger.log(
        `🚀 ~ file: service.ts:60 ~ AuthService ~ getAuthenticatedUser ~ error: ${error}`,
      );
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async hashPassword(plainTextPassword: string) {
    return await bcrypt.hash(
      plainTextPassword,
      this.configService.get<AuthConfig>('auth').saltOrRounds,
    );
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getJwtAccessToken(userId: string) {
    const payload: TokenPayload = { sub: userId, username: '' };
    const authConfig = this.configService.get<AuthConfig>('auth');

    const token = this.jwtService.sign(payload, {
      secret: authConfig.accessTokenSecretKey,
      expiresIn: `${authConfig.accessTokenExpiresInMinutes}m`,
    });
    return token;
  }

  public getJwtRefreshToken(userId: string) {
    const payload: TokenPayload = { sub: userId, username: '' };
    const authConfig = this.configService.get<AuthConfig>('auth');

    const token = this.jwtService.sign(payload, {
      secret: authConfig.refreshTokenSecretKey,
      expiresIn: `${authConfig.refreshTokenExpiresInMinutes}m`,
    });
    return token;
  }

  public getJwtVerifyToken(userId: string, username: string) {
    const payload: TokenPayload = { sub: userId, username: username };
    const authConfig = this.configService.get<AuthConfig>('auth');

    const token = this.jwtService.sign(payload, {
      secret: authConfig.verifyTokenSecretKey,
      expiresIn: `${authConfig.verifyTokenExpiresInMinutes}m`,
    });
    return token;
  }

  public getJwtResetPasswordToken(userId: string, username: string) {
    const payload: TokenPayload = { sub: userId, username: username };
    const authConfig = this.configService.get<AuthConfig>('auth');

    const token = this.jwtService.sign(payload, {
      secret: authConfig.resetPassTokenSecretKey,
      expiresIn: `${authConfig.resetPassTokenExpiresInMinutes}m`,
    });
    return token;
  }

  public async updateUserSecurity(
    userId: string,
    accessToken?: string,
    refreshToken?: string,
    verifyToken?: string,
    resetPassToken?: string,
  ) {
    return await this.userService.updateSecurity(
      userId,
      accessToken,
      refreshToken,
      verifyToken,
      resetPassToken,
    );
  }

  public async onAfterRegister(userId: string, username: string) {
    const verifyToken = this.getJwtVerifyToken(userId, username);
    await this.updateUserSecurity(userId, null, null, verifyToken);
    Logger.log(
      `🚀 ~ file: service.ts:135 ~ AuthService ~ onAfterRegister ~ verifyToken: ${verifyToken} `,
      username,
    );
  }

  async deleteUserSecurity(userId: string) {
    return await this.userService.deleteSecurity(userId);
  }

  async getUserByEmail(username: string) {
    const user = await this.userService.getByEmail(username);
    return user;
  }

  public async onForgotPassword(userId: string, username: string) {
    const resetPassToken = this.getJwtResetPasswordToken(userId, username);
    await this.updateUserSecurity(userId, null, null, null, resetPassToken);
    return resetPassToken;
  }

  public async onAfterForgotPassword(token: string, email: string) {
    // Trigger send reset password email
    Logger.log(
      `🚀 ~ file: service.ts:176 ~ AuthService ~ onAfterForgotPassword: Send token ${token} to email ${email}`,
    );
  }

  public async onChangePassword(userId: string, payload: ChangePasswordDto) {
    if (payload.password != payload.confirmPassword) {
      throw new HttpException(
        'Password does not match the confirm password.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await this.hashPassword(payload.password);
    await this.userService.changePassword(userId, hashedPassword);
  }

  public async onAfterChangePassword(email: string) {
    Logger.log(
      `🚀 ~ file: service.ts:186 ~ AuthService ~ onAfterChangePassword ~ email: ${email}`,
    );
  }

  public async onAfterResetPassword(email: string) {
    Logger.log(
      `🚀 ~ file: service.ts:205 ~ AuthService ~ onAfterResetPassword ~ email: ${email}`,
    );
  }
}

export default AuthService;
