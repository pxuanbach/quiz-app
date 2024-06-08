import { Injectable } from '@nestjs/common';
import { CreateThemeQuizDTO } from './dto/CreateThemeQuizDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeQuiz } from './entities/theme.repository';
import { ThemeQuizRepository } from './theme.repository';

export interface IThemeUpdate {
  primary: string;
  mainBg: string;
  wrong: string;
  success: string;
  contrastText: string;
  secondary: string;
}

@Injectable()
export class ThemeQuizService {
  constructor(
    @InjectRepository(ThemeQuizRepository)
    private themeRepository: ThemeQuizRepository,
  ) {}

  async createThemeQuiz(data: CreateThemeQuizDTO): Promise<ThemeQuiz> {
    const thmeQuiz = this.themeRepository.create(data);

    return await this.themeRepository.save(thmeQuiz);
  }

  async getThemeQuiz(): Promise<ThemeQuiz[]> {
    const thmeQuiz = await this.themeRepository.find();

    return thmeQuiz;
  }

  async getOneThemeById(id: string): Promise<ThemeQuiz> {
    const thmeQuiz = await this.themeRepository.findOne(id);

    return thmeQuiz;
  }

  async updateThemeById({
    id,
    theme,
  }: {
    id: string;
    theme: IThemeUpdate;
  }): Promise<IThemeUpdate> {
    const findTheme = await this.getOneThemeById(id);

    if (!findTheme) {
      throw new Error('theme with this id not exits!');
    }

    const assignTheme = Object.assign(findTheme, theme);

    const themeUpdated = this.themeRepository.save(assignTheme);

    return themeUpdated;
  }
}
