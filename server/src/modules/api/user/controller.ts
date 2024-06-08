import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  forwardRef,
} from '@nestjs/common';
import UserService from './service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import RequestWithUser from '../auth/requestUser.interface';
import { User } from './schema';
import MongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';
import { ApiBearerAuth } from '@nestjs/swagger';
import UpdateUserDto from './dto/update.dto';
import AuthService from '../auth/service';

@UseInterceptors(MongooseClassSerializerInterceptor(User))
@Controller('users')
@ApiTags('users')
export default class UserController {
  constructor(
    private readonly service: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth('access-token')
  getMe(@Req() request: RequestWithUser) {
    return request.user;
  }

  // @Get(':id')
  // async getById(@Param() { id }: ParamsMongoId) {
  //     return this.service.findOne(id)
  // }

  // @Post()
  // async createPost(@Body() payload: VocabularyDto) {
  //     return this.service.create(payload);
  // }

  // @Delete(':id')
  // async deletePost(@Param() { id }: ParamsMongoId) {
  //     return this.service.delete(id);
  // }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  @ApiBearerAuth('access-token')
  async updateUser(
    @Req() request: RequestWithUser,
    @Body() payload: UpdateUserDto,
  ) {
    const { user } = request;
    let isEmailChange = false;
    Logger.warn(`${payload.email} ${user.email}`);
    if (payload.email && payload.email !== user.email) {
      isEmailChange = true;
    }
    try {
      const updatedUser = await this.service.update(
        user._id.toString(),
        payload,
      );

      if (isEmailChange === true) {
        await this.authService.onAfterRegister(
          user._id.toString(),
          payload.email,
        );
        return 'Please verify your email!';
      }
      return updatedUser;
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
}
