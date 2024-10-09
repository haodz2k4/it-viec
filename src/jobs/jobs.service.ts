import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './schema/job.schema';
import { Model } from 'mongoose';
import { FilterJobDto, QueryJobDto } from './dto/query-job.dto';
import { IPaginationResponse } from 'src/utils/types/pagination';
import { filterFalsyValues } from 'src/utils/filter-obj.util';

@Injectable()
export class JobsService {

  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}
  async create(createJobDto: CreateJobDto) {
    return await this.jobModel.create(createJobDto)
  }

  async findAll(queryJobDto: QueryJobDto) {
    const {
      page = 1, 
      limit = 30, 
      sortBy = 'createdAt', 
      order = 'desc',
      selectFields = ""
    } = queryJobDto;
    const skip = (page - 1) * limit;
    //Filter 
    const {jobType, experienceLevel, keyword, searchBy = "title"} = queryJobDto;
    const filter = filterFalsyValues({jobType, experienceLevel});
    if(keyword){
      filter[searchBy] = new RegExp(keyword,"i")
    }
    const [products, totalItems] = await Promise.all([
    this.jobModel
      .find({...filter, deleted: false})
      .limit(limit)
      .skip(skip)
      .sort({[sortBy]: order})
      .select(selectFields),
      this.getTotalDocument(filter)
    ],)
    const totalPages = Math.ceil(totalItems / limit)
    const meta: IPaginationResponse = {
      totalItems,
      itemCount: products.length,
      itemsPerPage: limit,
      totalPages,
      currentPage: page
    }
    return {
      items: products,
      meta
    }
  }
  async getTotalDocument(filter: FilterJobDto):Promise<number> {
    return await this.jobModel.countDocuments({...filter, deleted: false});
  }

  async findOneById(id: string) {
    return await this.jobModel.findOne({_id: id,deleted: false})
  }
  async findOneBySlug(slug: string)  {
    return await this.jobModel.findOne({slug, deleted: false})
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
