import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [UsersModule, JwtModule.registerAsync({
    global: true,
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_ACCESS_SECRET'),
      signOptions: {
        expiresIn: configService.get<string>('JWT_ACCESS_EXPIRE')
      }
    }),
    inject: [ConfigService],
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
