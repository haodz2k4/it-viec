import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './schema/company.schema';
import { Model } from 'mongoose';
import { QueryCompanyDto } from './dto/query-company.dto';
import { IPaginationResponse } from 'src/utils/types/pagination';
import { SortOrder } from 'src/utils/types/sort.type';
import { query } from 'express';
@Injectable()
export class CompaniesService {

  constructor(@InjectModel(Company.name) private companyModel: Model<Company>) {}
  async create(createCompanyDto: CreateCompanyDto) {
    return await this.companyModel.create(createCompanyDto)
  }

  async findAll(queryCompanyDto: QueryCompanyDto = {}) {
    const {
      page = 1,
      limit = 5,
      sortBy = "createdAt",
      order = SortOrder.DESC,
      selectField = ""
    } = queryCompanyDto
    console.log(queryCompanyDto)
    const skip = (page - 1) * limit
    const [companies, total] = await Promise.all([
      this.companyModel
        .find({deleted: false})
        .sort({[sortBy]: order})
        .skip(skip)
        .select(selectField),
      this.companyModel.countDocuments({deleted: false})
    ])
    const totalPages = Math.ceil(total / limit);
    const meta: IPaginationResponse = {
      totalItems: total,
      itemCount: companies.length,
      itemsPerPage: limit,
      totalPages,
      currentPage: page
    }
    return {items: companies, meta}
  }

  async findOne(id: string) {
    return await this.companyModel.findOne({_id: id, deleted: true});
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findOne(id);
    if(!company){
      throw new NotFoundException("Company is not found")
    }
    Object.assign(company, updateCompanyDto)
    await company.save()
    return company
  }

  async remove(id: string): Promise<void> {
    const company = await this.findOne(id)
    if(!company){
      throw new NotFoundException("Company is not found")
    }
    company.deleted = true;
    await company.save()

  }
}

