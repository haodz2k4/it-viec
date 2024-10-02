import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transfrom-response.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Transform Interceptor 
  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new TransformInterceptor(reflector))
  //versioning
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  })
  const configService = app.get(ConfigService)
  await app.listen(configService.get<string>("PORT"));
}
bootstrap();
