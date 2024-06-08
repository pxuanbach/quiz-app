import { Body, Controller, Post } from '@nestjs/common';
import User from '../users/entities/User';
import { AuthService } from './auth.service';
import { AuthenticateDTO } from './dto/authenticate.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async signIn(
    @Body() data: AuthenticateDTO,
  ): Promise<{
    user: User;
    accessToken: string;
  }> {
    return this.authService.signIn(data);
  }
}
