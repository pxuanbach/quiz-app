import { Controller, UseInterceptors } from '@nestjs/common';
import { Question } from './schema';
import { ApiTags } from '@nestjs/swagger';
import MongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';
import QuestionService from './service';

@UseInterceptors(MongooseClassSerializerInterceptor(Question))
@Controller('questions')
@ApiTags('questions')
export default class QuestionController {
  constructor(private readonly service: QuestionService) {}
}
