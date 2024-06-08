import { query } from 'express';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnStatusTableQuiz1632098783022
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'quiz',
      new TableColumn({
        name: 'status',
        type: 'varchar',
        enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
        default: "'DRAFT'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('quiz', 'status');
  }
}
