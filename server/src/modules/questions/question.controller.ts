import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { Questions } from './entities/question.repository';
import { IQuestionUpdate, QuestionService } from './question.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('question')
@UseGuards(AuthGuard())
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post()
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Questions> {
    return await this.questionService.createQuestion(createQuestionDto);
  }

  @Get()
  async getAllQuestions(): Promise<Questions[]> {
    return await this.questionService.getQuestions();
  }

  @Get('/:id')
  async getOneQuiz(@Param('id') id: string): Promise<Questions> {
    return await this.questionService.getQuestionById(id);
  }

  @Delete('/:id')
  async removeQuestion(@Param('id') id: string): Promise<Questions> {
    return await this.questionService.removeQuestion(id);
  }

  @Put('/:id')
  async updateQuestion(@Param('id') id: string, @Body() data: IQuestionUpdate) {
    return await this.questionService.updateQuestionById({
      id,
      question: data,
    });
  }
}
