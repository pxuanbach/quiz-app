import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import appConfiguration from './config/app/configuration';
import dbConfiguration from './config/db/configuration';
import authConfiguration from './config/auth/configuration';
import cloudinaryConfiguration from './config/cloudinary/configuration';
import DatabaseConfig from './config/db/interface';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ModulesModule } from './modules/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
      load: [
        appConfiguration,
        dbConfiguration,
        authConfiguration,
        cloudinaryConfiguration,
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get<DatabaseConfig>('database.mongo');

        let uri = `mongodb://${config.host}`;
        if (config.username) {
          uri = `mongodb://${config.username}:${config.password}@${config.host}`;
        }

        return {
          uri: uri,
          dbName: config.database,
        };
      },
      inject: [ConfigService],
    }),
    ModulesModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
