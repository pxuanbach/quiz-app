import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/createUserDTO.';
import User from './entities/User';
import { UserRepository } from './users.repository';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { jwtConfig } from 'src/config/jwt.config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async encryptPassword(password: string): Promise<string> {
    const password_hash = await hash(password, 8);

    return password_hash;
  }

  async createUser(data: CreateUserDTO): Promise<User | undefined> {
    const userExists = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'User already exists!',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const password_hash = await this.encryptPassword(data.password);

    const user = this.userRepository.create(
      Object.assign(data, (data.password = password_hash)),
    );

    await this.userRepository.save(user);

    return user;
  }

  async getUser(userId: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      select: ['email', 'lastname', 'name', 'username'],
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'User not already exists!',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
