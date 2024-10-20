import { Module } from '@nestjs/common';
import { DatabasesService } from './databases.service';

@Module({
  controllers: [],
  providers: [DatabasesService]
})
export class DatabasesModule {}
