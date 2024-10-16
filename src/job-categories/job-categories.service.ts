import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobCategoryDto } from './dto/create-job-category.dto';
import { UpdateJobCategoryDto } from './dto/update-job-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { JobCategory } from './schema/job-category.schema';
import { Model } from 'mongoose';
import { FilterJobCategory, QueryJobCategory } from './dto/query-job-category.dto';
import { SortOrder } from 'src/utils/types/sort.type';
import sortUtils from "../utils/sort";
import { filterFalsyValues } from 'src/utils/filter-obj.util';
import { IPaginationResponse } from 'src/utils/types/pagination';
@Injectable()
export class JobCategoriesService {
  constructor(@InjectModel(JobCategory.name) private jobCategoryModel: Model<JobCategory>) {}
  create(createJobCategoryDto: CreateJobCategoryDto) {
    return this.jobCategoryModel.create(createJobCategoryDto);
  }

  async findAll(queryJobCategory: QueryJobCategory) {
    
    const {
      parentCategory,
      status,
      keyword,
      searchBy = "categoryName",
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      order = SortOrder.DESC,
      selectFields = ""
    } = queryJobCategory;
    const skip = (page - 1) * limit;
    const sort = sortUtils(sortBy, order)
    const filter: Record<string, any> = filterFalsyValues({parentCategory, status})
    //seach 
    if(keyword){
      filter[searchBy] = new RegExp(keyword,"i")
    }
    const [jobCategories, totalItems] = await Promise.all([
      this.jobCategoryModel
        .find(filter)
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .select(selectFields),
      this.getTotalDocument(filter)
    ])
    const totalPages = Math.ceil(totalItems / limit)
    const pagination: IPaginationResponse = {
      totalItems,
      itemCount: jobCategories.length,
      itemsPerPage: limit,
      totalPages,
      currentPage: page
    }
    return {
      meta: pagination,
      items: jobCategories
    }
  }
  
  async getTotalDocument(filterJobCategory?: FilterJobCategory) {
    return await this.jobCategoryModel.countDocuments(filterJobCategory)
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
