import { Quiz } from '../../quiz/entities/Quiz';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

@Entity('questions')
class Questions extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  title: string;

  @Column()
  image_url: string;

  @Column()
  description: string;

  @Column()
  answer: string;

  @Column()
  quizId: string;

  @ManyToOne(
    () => Quiz,
    quiz => quiz.questions,
  )
  quiz: Quiz;

  @Column('text', { array: true })
  alternatives: string[];

  @CreateDateColumn()
  created_at?: string;

  @CreateDateColumn()
  updated_at?: string;
}

export { Questions };
