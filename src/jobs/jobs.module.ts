import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job, jobSchema } from './schema/job.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Job.name,schema: jobSchema}])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
