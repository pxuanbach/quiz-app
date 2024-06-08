import { Model } from 'mongoose';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema';
import { NotFoundException } from '@nestjs/common';
import CreateUserDto from './dto/create.dto';
import UpdateUserDto from './dto/update.dto';

@Injectable()
class UserService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  async getAll() {
    return this.model.find();
  }

  async getById(id: string) {
    const result = await this.model.findById(id);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  async getByEmail(email: string) {
    const result = await this.model.findOne({ email });
    return result;
  }

  create(data: CreateUserDto) {
    const result = new this.model(data);
    return result.save();
  }

  async update(id: string, data: UpdateUserDto) {
    const result = await this.model
      .findByIdAndUpdate(id, data)
      .setOptions({ new: true, strict: false });
    if (!result) {
      throw new HttpException(
        'User with this id does not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  async updateSecurity(
    id: string,
    accessToken?: string,
    refreshToken?: string,
    verifyToken?: string,
    resetPassToken?: string,
  ) {
    const setFields = {
      'security.accessToken': accessToken || undefined,
      'security.refreshToken': refreshToken || undefined,
      'security.verifyToken': verifyToken || undefined,
      'security.resetPassToken': resetPassToken || undefined,
    };

    if (verifyToken) {
      setFields['security.verified'] = false;
      setFields['security.accessToken'] = null;
      setFields['security.refreshToken'] = null;
    }

    const result = await this.model.updateOne(
      { _id: id },
      {
        $set: setFields,
      },
    );
    if (!result) {
      throw new HttpException(
        "Can not update user's security.",
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  async deleteSecurity(id: string) {
    const result = await this.model.updateOne(
      { _id: id },
      {
        $set: {
          'security.accessToken': '',
          'security.refreshToken': '',
          'security.verifyToken': '',
          'security.resetPassToken': '',
        },
      },
    );
    if (!result) {
      throw new HttpException(
        "Can not delete user's security.",
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  async verifyUser(id: string, username: string, verifyToken: string) {
    const user = await this.model.findOne({ _id: id, email: username });

    if (!user) {
      throw new NotFoundException();
    }

    const isVerifyTokenMatch = verifyToken === user.security.verifyToken;

    if (isVerifyTokenMatch) {
      const result = await this.model.updateOne(
        { _id: id },
        {
          $set: {
            security: {
              verified: true,
              verifyToken: '',
            },
          },
        },
      );
      if (!result) {
        throw new HttpException(
          "Can not update user's security.",
          HttpStatus.BAD_REQUEST,
        );
      }
      return result;
    } else {
      throw new ForbiddenException();
    }
  }

  async delete(id: string) {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) {
      throw new HttpException(
        'User with this id does not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getUserIfAccessTokenMatches(accessToken: string, userId: string) {
    const user = await this.getById(userId);

    if (!user.security) {
      return null;
    }

    const isAccessTokenMatch = accessToken === user.security.accessToken;

    if (isAccessTokenMatch) {
      return user;
    }
    return null;
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.getById(userId);

    const isRefreshTokenMatch = refreshToken === user.security.refreshToken;

    if (isRefreshTokenMatch) {
      return user;
    }
    return null;
  }

  async getUserIfResetPasswordTokenMatches(
    resetPassToken: string,
    userId: string,
  ) {
    const user = await this.getById(userId);

    const isResetPassTokenMatch =
      resetPassToken === user.security.resetPassToken;

    if (isResetPassTokenMatch) {
      return user;
    }
    return null;
  }

  async changePassword(userId: string, hashedPassword: string) {
    const result = await this.model.updateOne(
      { _id: userId },
      {
        $set: {
          hashedPassword: hashedPassword,
          security: {
            resetPassToken: '',
          },
        },
      },
    );
    if (!result) {
      throw new HttpException(
        'Password change failed.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }
}

export default UserService;
