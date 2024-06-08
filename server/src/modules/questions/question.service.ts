import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from './entities/question.repository';
import { QuestionsRepository } from './question.repository';

export interface IQuestionUpdate {
  title: string;
  image_url: string;
  description: string;
  answer: string;
  quizId: string;
  alternatives: string[];
}

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionsRepository)
    private questionRepository: QuestionsRepository,
  ) {}

  async createQuestion(data: CreateQuestionDto): Promise<Questions> {
    const quiz = this.questionRepository.create(data);

    return await this.questionRepository.save(quiz);
  }

  async getQuestions(): Promise<Questions[]> {
    const quiz = await this.questionRepository.find({
      select: [
        'description',
        'id',
        'image_url',
        'title',
        'created_at',
        'updated_at',
      ],
      relations: ['quiz'],
    });

    return quiz;
  }

  async getQuestionById(id: string): Promise<Questions> {
    const findQuestion = await this.questionRepository.findOne(id);

    if (!findQuestion) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Question with this id not exits!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const question = await this.questionRepository.findOne({
      relations: ['quiz'],
      where: {
        id: id,
      },
    });

    return question;
  }

  async updateQuestionById({
    id,
    question,
  }: {
    id: string;
    question: IQuestionUpdate;
  }): Promise<IQuestionUpdate> {
    const findQuestion = await this.questionRepository.findOne(id);

    if (!findQuestion) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Question with this id not exits!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const assignQuestion = Object.assign(findQuestion, question);

    const questionUpdated = await this.questionRepository.save(assignQuestion);

    return questionUpdated;
  }

  async removeQuestion(id: string): Promise<Questions> {
    const findQuestion = await this.questionRepository.findOne(id);

    if (!findQuestion) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Question with this id not exits!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const question = await this.questionRepository.remove(findQuestion);

    return question;
  }
}
