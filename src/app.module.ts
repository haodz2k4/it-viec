import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { JobCategoriesModule } from './job-categories/job-categories.module';
import { CompaniesModule } from './companies/companies.module';
import { RolesModule } from './roles/roles.module';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), 
    JobsModule,
    UsersModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    CloudinaryModule,
    JobCategoriesModule,
    CompaniesModule,
    RolesModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
