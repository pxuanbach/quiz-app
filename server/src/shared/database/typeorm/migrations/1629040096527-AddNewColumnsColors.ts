import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddNewColumnsColors1629040096527 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'theme_colors',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'primary',
            type: 'varchar',
            default: 'NULL',
          },
          {
            name: 'secondary',
            type: 'varchar',
            default: 'NULL',
          },
          {
            name: 'mainBg',
            type: 'varchar',
            default: 'NULL',
          },
          {
            name: 'wrong',
            type: 'varchar',
            default: 'NULL',
          },
          {
            name: 'contrastText',
            type: 'varchar',
            default: 'NULL',
          },
          {
            name: 'success',
            type: 'varchar',
            default: 'NULL',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('theme_colors');
  }
}
