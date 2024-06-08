import { Questions } from '../../questions/entities/question.repository';
import { ThemeQuiz } from '../../theme/entities/theme.repository';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { StatusQuiz } from '../dto/createQuiz.dto';

@Entity('quiz')
class Quiz extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  title: string;

  @OneToMany(
    () => Questions,
    Questions => Questions.quiz,
  )
  questions: Quiz[];

  @Column()
  themeId: string;

  @Column()
  userId: string;

  @OneToOne(() => ThemeQuiz)
  @JoinColumn({ name: 'themeId' })
  theme: ThemeQuiz;

  @Column()
  status: StatusQuiz;

  @Column()
  img_bg_url: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at?: string;

  @CreateDateColumn()
  updated_at?: string;
}

export { Quiz };
