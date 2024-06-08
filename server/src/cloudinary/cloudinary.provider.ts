import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import CloudinaryConfig from '../config/cloudinary/interface';

export const CloudinaryProvider = {
  provide: 'cloudinary',
  useFactory: async (configService: ConfigService) => {
    const config = configService.get<CloudinaryConfig>('cloudinary');

    return v2.config({
      cloud_name: config.name,
      api_key: config.apiKey,
      api_secret: config.apiSecret,
    });
  },
  inject: [ConfigService],
};
