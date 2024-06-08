import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import LogInDto from './dto/logIn.dto';
import RegisterDto from './dto/register.dto';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import AuthService from './service';
import { JwtAuthGuard } from './jwtAuth.guard';
import { LocalAuthGuard } from './localAuth.guard';
import RequestWithUser from './requestUser.interface';
import { JwtRefreshGuard } from './jwtRefresh.guard';
import { JwtVerifyGuard } from './jwtVerify.guard';
import { JwtResetPasswordGuard } from './jwtResetPass.guard';
import MongooseClassSerializerInterceptor from '../../../utils/mongooseClassSerializer.interceptor';
import { User } from '../user/schema';
import ForgotPasswordDto from './dto/forgotPassword.dto';
import ResetPasswordDto from './dto/resetPassword.dto';

@UseInterceptors(MongooseClassSerializerInterceptor(User))
@Controller('auth')
@ApiTags('auth')
export default class AuthController {
  constructor(private readonly service: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LogInDto })
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const userId = user._id.toString();
    const accessToken = this.service.getJwtAccessToken(userId);
    const refreshToken = this.service.getJwtRefreshToken(userId);

    // update security
    await this.service.updateUserSecurity(
      userId,
      accessToken,
      refreshToken,
      null,
      null,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('register')
  async register(@Body() payload: RegisterDto) {
    const user = await this.service.register(payload);
    return user;
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('logout')
  async logout(@Req() request: RequestWithUser) {
    const { user } = request;
    const userId = user._id.toString();
    await this.service.deleteUserSecurity(userId);
    return 'Success!';
  }

  @UseGuards(JwtVerifyGuard)
  @ApiBearerAuth('access-token')
  @Post('verify')
  async verify() {
    return 'Account verified successfully!';
  }

  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth('access-token')
  @Post('refresh')
  async refresh(@Req() request: RequestWithUser) {
    const { user } = request;
    const userId = user._id.toString();
    const accessToken = this.service.getJwtAccessToken(userId);
    const refreshToken = this.service.getJwtRefreshToken(userId);

    // update security
    await this.service.updateUserSecurity(userId, accessToken, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() payload: ForgotPasswordDto) {
    const user = await this.service.getUserByEmail(payload.username);
    if (user) {
      const userId = user._id.toString();
      const result = await this.service.onForgotPassword(userId, user.email);
      await this.service.onAfterForgotPassword(result, user.email);
    }
    return 'Success!';
  }

  @UseGuards(JwtResetPasswordGuard)
  @ApiBearerAuth('access-token')
  @Post('reset-password')
  async resetPassword(
    @Req() request: RequestWithUser,
    @Body() payload: ResetPasswordDto,
  ) {
    const { user } = request;
    const userId = user._id.toString();

    await this.service.onChangePassword(userId, payload);

    await this.service.onAfterResetPassword(user.email);
    return 'Success!';
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('change-password')
  async changePassword(
    @Req() request: RequestWithUser,
    @Body() payload: ResetPasswordDto,
  ) {
    const { user } = request;
    const userId = user._id.toString();

    await this.service.onChangePassword(userId, payload);

    await this.service.onAfterChangePassword(user.email);
    return 'Success!';
  }
}
