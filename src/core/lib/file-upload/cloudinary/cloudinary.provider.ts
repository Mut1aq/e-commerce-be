import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';
import { CLOUDINARY_TOKEN } from './cloudinary.token';

export const CloudinaryProvider: Provider = {
  provide: CLOUDINARY_TOKEN,
  useFactory: async (configService: ConfigService) => {
    return v2.config({
      api_key: configService.get<string>('CLOUDINARY_API_KEY')!,
      cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME')!,
      api_secret: configService.get<string>('CLOUDINARY_API_SECRET')!,
    });
  },
  inject: [ConfigService],
};
