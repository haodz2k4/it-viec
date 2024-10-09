import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './schema/job.schema';
import { Model } from 'mongoose';

@Injectable()
export class JobsService {

  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}
  async create(createJobDto: CreateJobDto) {
    return await this.jobModel.create(createJobDto)
  }

  async findAll() {
    return await this.jobModel.find({deleted: false})
  }

  async findOneById(id: string) {
    return await this.jobModel.findOne({_id: id,deleted: false})
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    const job = await this.findOneById(id);
    if(!job){
      throw new NotFoundException("Job is not found");
    }
    Object.assign(job,updateJobDto)
    await job.save()
    return job
  }

  async remove(id: string) {
    return await this.jobModel.updateOne({_id: id},{deleted: true})
  }
}
