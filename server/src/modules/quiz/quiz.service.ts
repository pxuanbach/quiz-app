import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuizDto, StatusQuiz } from './dto/createQuiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/Quiz';
import { QuizRepository } from './quiz.repository';
import { ThemeQuizRepository } from '../theme/theme.repository';
import { ThemeQuizService } from '../theme/theme.service';
import { CreateUserDTO } from '../users/dto/createUserDTO.';

export interface IQuiz {
  id: string;
  bg: string;
  title: string;
  description: string;
  questions: IQuestions[];
}

export interface IQuestions {
  image: string;
  title: string;
  answer: number;
  alternatives: string[];
}

export interface IQuizUpdate {
  bg: string;
  title: string;
  description: string;
}

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizRepository)
    private quizRepository: QuizRepository,
    private themeQuizRepository: ThemeQuizRepository,
  ) {}

  async createQuiz(data: CreateQuizDto): Promise<Quiz> {
    const theme = await this.themeQuizRepository.findOne(data.themeId);

    if (!theme) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'This theme not exits!',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const quiz = this.quizRepository.create(data);

    return await this.quizRepository.save(quiz);
  }

  async getQuizes(): Promise<Quiz[]> {
    const quiz = await this.quizRepository.find({
      select: [
        'id',
        'img_bg_url',
        'description',
        'title',
        'theme',
        'updated_at',
        'created_at',
      ],
      relations: ['questions', 'theme'],
    });
    return quiz;
  }

  async getQuizUser(userId: string): Promise<Quiz[]> {
    const quiz = await this.quizRepository.find({
      select: [
        'id',
        'img_bg_url',
        'description',
        'title',
        'theme',
        'updated_at',
        'created_at',
      ],
      relations: ['questions', 'theme'],
      where: {
        userId,
      },
    });
    return quiz;
  }

  async getOneQuizById(id: string): Promise<Quiz> {
    const findQuiz = await this.quizRepository.findOne(id);

    if (!findQuiz) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Quiz with this id not exits!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    this.quizRepository;
    const quiz = await this.quizRepository.findOne({
      select: [
        'id',
        'img_bg_url',
        'description',
        'title',
        'theme',
        'updated_at',
        'created_at',
      ],
      relations: ['questions', 'theme'],
      where: {
        id,
      },
    });
    return quiz;
  }

  async addThemeToQuiz({
    id,
    themeId,
  }: {
    id: string;
    themeId: string;
  }): Promise<Quiz | undefined> {
    const quiz = await this.quizRepository.findOne(id);

    if (!quiz) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Quiz with this id not exits!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    quiz.themeId = themeId;

    await this.quizRepository.save(quiz);

    return quiz;
  }

  async updateQuizById({
    id,
    quiz,
  }: {
    id: string;
    quiz: IQuizUpdate;
  }): Promise<IQuizUpdate> {
    const findQuiz = await this.getOneQuizById(id);

    if (!findQuiz) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Quiz with this id not exits!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const assignQuiz = Object.assign(findQuiz, quiz);

    const quizUpdated = this.quizRepository.save(assignQuiz);

    return quizUpdated;
  }

  async removeQuizById(id: string): Promise<Quiz> {
    const findQuiz = await this.getOneQuizById(id);

    if (!findQuiz) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Quiz with this id not exits!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const removedQuiz = await this.quizRepository.remove(findQuiz);

    return removedQuiz;
  }

  async updateStatusQuiz({ id, status }: { id: string; status: StatusQuiz }) {
    const quiz = await this.quizRepository.findOne(id);

    if (!quiz) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Quiz with this id not exits!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    Object.assign(quiz, status);

    const quizUpdated = this.quizRepository.save(quiz);

    return quizUpdated;
  }
}
