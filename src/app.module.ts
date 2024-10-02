import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), 
    UsersModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
