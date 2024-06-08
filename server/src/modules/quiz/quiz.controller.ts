import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  Headers,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateQuizDto, StatusQuiz } from './dto/createQuiz.dto';
import { Quiz } from './entities/Quiz';
import { IQuizUpdate, QuizService } from './quiz.service';

@Controller('/quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post('/')
  @UseGuards(AuthGuard())
  async createQuiz(
    @Body() createQuizDto: CreateQuizDto,
    @Request() request,
  ): Promise<Quiz> {
    const { user } = request;
    createQuizDto.userId = user.id;
    return await this.quizService.createQuiz(createQuizDto);
  }

  @Get('/user')
  @UseGuards(AuthGuard())
  async getQuizUser(@Request() request): Promise<Quiz[]> {
    const { user } = request;
    const userId = user.id;
    return await this.quizService.getQuizUser(userId);
  }

  @Get()
  async getAllQuizes(): Promise<Quiz[]> {
    return await this.quizService.getQuizes();
  }

  @Get('/:id')
  async getOneQuiz(@Param('id') id: string): Promise<Quiz> {
    return await this.quizService.getOneQuizById(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  async updateQuizThemeId(
    @Param('id') id: string,
    @Body() data: string,
  ): Promise<Quiz> {
    const { themeId } = data as any;
    return await this.quizService.addThemeToQuiz({ id, themeId: themeId });
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  async updateQuiz(@Param('id') id: string, @Body() data: IQuizUpdate) {
    return await this.quizService.updateQuizById({ id, quiz: data });
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async removeQuiz(@Param('id') id: string): Promise<Quiz> {
    return await this.quizService.removeQuizById(id);
  }

  @Patch('/status/:id')
  @UseGuards(AuthGuard())
  async updateStatusQuiz(
    @Param('id') id: string,
    @Body() status: StatusQuiz,
  ): Promise<Quiz> {
    return await this.quizService.updateStatusQuiz({ id, status });
  }
}
