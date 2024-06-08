import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO } from './dto/createUserDTO.';
import User from './entities/User';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async signUp(@Body() data: CreateUserDTO): Promise<User | undefined> {
    return this.userService.createUser(data);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  async getUser(@Request() request): Promise<User | undefined> {
    const { user } = request;
    const userId = user.id;
    return await this.userService.getUser(userId);
  }
}
