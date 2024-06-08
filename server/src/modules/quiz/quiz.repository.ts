import { EntityRepository, Repository } from 'typeorm';
import { Quiz } from './entities/Quiz';

@EntityRepository(Quiz)
export class QuizRepository extends Repository<Quiz> {}
