import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transfrom-response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Cookie Parser 
  app.use(cookieParser())
  //Transform Interceptor 
  const reflector = app.get(Reflector)
  //versioning
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  })
  app.useGlobalInterceptors(new TransformInterceptor(reflector))
  app.useGlobalPipes(new ValidationPipe({
    transform: true, //Accept to transfrom value
    whitelist: true, //Accept only field in Data transfer object
    forbidNonWhitelisted: true, //throw error 
  }))
  const configService = app.get(ConfigService)
  //Swagger
  const config = new DocumentBuilder()
    .setTitle('IT VIEC')
    .setDescription('Trang web tuyển dụng IT hàng đầu Việt Nam')
    .setVersion('1.0')
    .addTag('Users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get<string>("PORT"));
}
bootstrap();
