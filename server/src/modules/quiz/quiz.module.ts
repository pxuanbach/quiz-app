import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizController } from './quiz.controller';
import { QuizRepository } from './quiz.repository';
import { QuizService } from './quiz.service';
import { AuthModule } from '../auth/auth.module';
import { ThemeQuizService } from '../theme/theme.service';
import { ThemeQuizRepository } from '../theme/theme.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizRepository, ThemeQuizRepository]),
    AuthModule,
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
