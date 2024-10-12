import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobCategoryDto } from './dto/create-job-category.dto';
import { UpdateJobCategoryDto } from './dto/update-job-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { JobCategory } from './schema/job-category.schema';
import { Model } from 'mongoose';

@Injectable()
export class JobCategoriesService {
  constructor(@InjectModel(JobCategory.name) private jobCategoryModel: Model<JobCategory>) {}
  create(createJobCategoryDto: CreateJobCategoryDto):Promise<JobCategory> {
    return this.jobCategoryModel.create(createJobCategoryDto);
  }

  async findAll(): Promise<JobCategory[]> {
    return await this.jobCategoryModel.find()
  }

  async findOne(id: string):Promise<JobCategory>  {
    return await this.jobCategoryModel.findOne({_id: id, deleted: false});
  }

  async update(id: string, updateJobCategoryDto: UpdateJobCategoryDto) {
    const jobCategory = await this.jobCategoryModel.findOne({_id: id},updateJobCategoryDto);
    if(!jobCategory){
      throw new NotFoundException(HttpStatus.NOT_FOUND,"Job category is not found")
    }
    Object.assign(jobCategory,updateJobCategoryDto);
    await jobCategory.save();
    return jobCategory;
  }

  async remove(id: string): Promise<void> {
    const infoUpdate = await this.jobCategoryModel.updateOne({_id: id},{deleted: true})
    if(infoUpdate.matchedCount ==0 && infoUpdate.modifiedCount === 0){
      throw new NotFoundException(HttpStatus.NOT_FOUND,"Job category is not found")
    }
  }
}
