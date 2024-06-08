import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateThemeQuizDTO } from './dto/CreateThemeQuizDTO';
import { ThemeQuiz } from './entities/theme.repository';
import { IThemeUpdate, ThemeQuizService } from './theme.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('themeQuiz')
@UseGuards(AuthGuard())
export class ThemeQuizController {
  constructor(private themeQuizService: ThemeQuizService) {}

  @Post()
  async createQuestion(@Body() data: CreateThemeQuizDTO): Promise<ThemeQuiz> {
    return await this.themeQuizService.createThemeQuiz(data);
  }

  @Get()
  async getAllThemeQuiz(): Promise<ThemeQuiz[]> {
    return await this.themeQuizService.getThemeQuiz();
  }

  @Get('/:id')
  async getOneThemeById(@Param('id') id: string) {
    return await this.themeQuizService.getOneThemeById(id);
  }

  @Put('/:id')
  async updateTheme(@Param('id') id: string, @Body() data: IThemeUpdate) {
    return await this.themeQuizService.updateThemeById({ id, theme: data });
  }
}
