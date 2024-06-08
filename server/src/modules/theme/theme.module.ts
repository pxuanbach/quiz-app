import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ThemeQuizController } from './theme.controller';
import { ThemeQuizRepository } from './theme.repository';
import { ThemeQuizService } from './theme.service';

@Module({
  imports: [TypeOrmModule.forFeature([ThemeQuizRepository]), AuthModule],
  controllers: [ThemeQuizController],
  providers: [ThemeQuizService],
})
export class ThemeQuizModule {}
