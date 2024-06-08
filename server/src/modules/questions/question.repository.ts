import { EntityRepository, Repository } from 'typeorm';
import { Questions } from './entities/question.repository';

@EntityRepository(Questions)
export class QuestionsRepository extends Repository<Questions> {}
