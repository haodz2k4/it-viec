import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schema/user.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
@Module({
  imports: [ MongooseModule.forFeature([{name: User.name, schema: userSchema}]), CloudinaryModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
