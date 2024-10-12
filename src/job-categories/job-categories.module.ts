import { Module } from '@nestjs/common';
import { JobCategoriesService } from './job-categories.service';
import { JobCategoriesController } from './job-categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobCategory, JobCategorySchema } from './schema/job-category.schema';


@Module({
  imports: [MongooseModule.forFeature([{name: JobCategory.name, schema: JobCategorySchema}])],
  controllers: [JobCategoriesController],
  providers: [JobCategoriesService],
})
export class JobCategoriesModule {}
