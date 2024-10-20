import sortUtils from 'src/utils/sort';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { QueryUserDto, FilterUserDto } from './dto/query-user.dto';
import { filterFalsyValues } from 'src/utils/filter-obj.util';
import { SortOrder } from 'src/utils/types/sort.type';
import { RegisterReqDto } from 'src/auth/dto/register-req.dto';
import { IPaginationResponse } from 'src/utils/types/pagination';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto | RegisterReqDto){
    return await this.userModel.create(createUserDto)
  }

  async getUsers(queryUserDto: QueryUserDto) {
    const {
      page = 1, 
      limit = 50, 
      sortBy = 'createdAt', 
      order = SortOrder.DESC,
      selectFields = ""
    } = queryUserDto
    //Filter
    const {status, role, keyword, searchBy = "fullName"} = queryUserDto
    const filter = filterFalsyValues({status, role});
    if(keyword){
      filter[searchBy] = new RegExp(keyword, "i") 
    }
    //Skip
    const skip = (page - 1) * limit;
    //Sort Order
    const sort = sortUtils(sortBy, order)
    const [users, totalItems] = await Promise.all([
      this.userModel
      .find({...filter,deleted: false})
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(selectFields),
      this.getTotalItems(filter)
    ])
    const totalPages = Math.ceil(totalItems / limit)
    const meta: IPaginationResponse = {
      totalItems,
      itemCount: users.length,
      itemsPerPage: limit,
      totalPages,
      currentPage: page
    }
    return {items: users, meta}

  }
  async getTotalItems(filter: FilterUserDto):Promise<number> {
    return await this.userModel.countDocuments({...filter,deleted: false})
  }
  async findOneById(id: string) {
    return await this.userModel.findOne({_id: id, deleted: false})
  }
  async findOneByEmail(email: string) {
    return await this.userModel
      .findOne({email, deleted: false})
      .select("+password")
  }
  
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneById(id);
    if(!user){
      throw new NotFoundException("User is not found")
    }
    Object.assign(user, updateUserDto);
    await user.save();
    return user;
  }

  async remove(id: string) {
    return await this.userModel.updateOne({_id: id},{deleted: true});
  }
}
