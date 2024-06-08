import { EntityRepository, Repository } from 'typeorm';
import { ThemeQuiz } from './entities/theme.repository';

@EntityRepository(ThemeQuiz)
export class ThemeQuizRepository extends Repository<ThemeQuiz> {}
