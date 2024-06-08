import { Controller, UseInterceptors } from '@nestjs/common';
import { Quiz } from './schema';
import { ApiTags } from '@nestjs/swagger';
import MongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';
import QuizService from './service';

@UseInterceptors(MongooseClassSerializerInterceptor(Quiz))
@Controller('quizzes')
@ApiTags('quizzes')
export default class QuizController {
  constructor(private readonly service: QuizService) {}
}
