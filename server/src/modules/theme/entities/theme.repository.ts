import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'theme_colors' })
class ThemeQuiz extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  primary: string;

  @Column()
  mainBg: string;

  @Column()
  wrong: string;

  @Column()
  success: string;

  @Column()
  contrastText: string;

  @Column()
  secondary: string;

  @CreateDateColumn()
  created_at?: string;

  @CreateDateColumn()
  updated_at?: string;
}

export { ThemeQuiz };
