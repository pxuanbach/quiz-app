require('dotenv').config();

module.exports = {
  "type": "postgres",
  "host": process.env.DATABASE_HOST,
  // logging: true,
  "port": parseInt(process.env.DATABASE_PORT) || 5432,
  "username": process.env.DATABASE_USER,
  "password": process.env.DATABASE_PWD,
  "database": process.env.DATABASE_NAME,
  // "ssl": { "rejectUnauthorized": false },
  "migrations": [
    "./src/shared/database/typeorm/migrations/*.{js,ts}"
  ],
  "cli": {
    "migrationsDir": "./src/shared/database/typeorm/migrations"
  }
}