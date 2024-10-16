import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './schema/company.schema';
import { Model } from 'mongoose';

@Injectable()
export class CompaniesService {

  constructor(@InjectModel(Company.name) private companyModel: Model<Company>) {}
  async create(createCompanyDto: CreateCompanyDto) {
    return await this.companyModel.create(createCompanyDto)
  }

  async findAll() {
    return await this.companyModel.find()
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
