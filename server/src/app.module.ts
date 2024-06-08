import { Module } from '@nestjs/common';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizModule } from './modules/quiz/quiz.module';
import { QuestionModule } from './modules/questions/question.module';
import { ThemeQuizModule } from './modules/theme/theme.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    QuizModule,
    QuestionModule,
    ThemeQuizModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
