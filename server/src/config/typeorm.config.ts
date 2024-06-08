import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  // logging: true,
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PWD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../modules/**/entities/*.{js,ts}'],
  migrations: [__dirname + '/../shared/database/typeorm/migrations/*.{ts,js}'],
  cli: {
    migrationsDir: __dirname + '/../shared/database/typeorm/migrations',
  },
  synchronize: false,
  // ssl: { rejectUnauthorized: false },
};
