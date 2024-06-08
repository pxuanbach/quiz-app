import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddForeignKeyToQuestion1627960912311
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "public"."questions" ADD "quizId" uuid NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "public"."questions" ADD CONSTRAINT "QuizQuestions" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE CASCADE ON UPDATE SET NULL',
    );
    // await queryRunner.query('ALTER TABLE "public"."questions" ALTER COLUMN "quizId" DROP NOT NULL')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('questions', 'QuizQuestions');
    await queryRunner.dropColumn('quizId', 'questions');
  }
}

// import { MigrationInterface, QueryRunner } from "typeorm";

// export class AddForeignKeyToQuestion1627960912311 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query('ALTER TABLE questions ADD COLUMN quizId VARCHAR(60) NOT NULL')

//         await queryRunner.query('ALTER TABLE fk_questions_quiz FOREIGN KEY (id) REFERENCES quiz (id)')
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query('ALTER TABLE questions DROP CONSTRAINT fk_questions_quiz')

//         await queryRunner.query('ALTER TABLE questions DROP COLUMN quizId')
//     }
// }
