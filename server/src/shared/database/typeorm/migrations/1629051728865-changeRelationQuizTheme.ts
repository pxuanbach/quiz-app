import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class changeRelationQuizTheme1629051728865
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropForeignKey('theme_colors', 'ThemeQuiz');
    // await queryRunner.dropColumn('theme_colors', 'quizId');

    await queryRunner.addColumn(
      'quiz',
      new TableColumn({
        name: 'themeId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'quiz',
      new TableForeignKey({
        columnNames: ['themeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'theme_colors',
        name: 'ThemeQuiz',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
    // await queryRunner.query('ALTER TABLE "public"."questions" ALTER COLUMN "quizId" DROP NOT NULL')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('quiz', 'ThemeQuiz');
    await queryRunner.dropColumn('quiz', 'themeId');
  }
}
