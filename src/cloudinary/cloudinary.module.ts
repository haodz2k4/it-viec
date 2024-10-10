import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { v2 } from 'cloudinary';
import { ConfigModule, ConfigService } from '@nestjs/config';

const CLOUDINARY_PROVIDER = {
  provide: 'CLOUDINARY',
  useFactory: (configService: ConfigService) => {
    return v2.config({
      cloud_name: configService.get<string>('CLOUD_NAME'),
      api_key: configService.get<string>('CLOUD_KEY'),
      api_secret: configService.get<string>('CLOUD_SECRET'),
    });
  },
  inject: [ConfigService],
};

@Module({
  imports: [ConfigModule], 
  providers: [CLOUDINARY_PROVIDER, CloudinaryService],
  exports: [CLOUDINARY_PROVIDER, CloudinaryService], 
})
export class CloudinaryModule {}
