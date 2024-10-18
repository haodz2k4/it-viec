import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schema/role.schema';
import { Model } from 'mongoose';

@Injectable()
export class RolesService {

  constructor(@InjectModel(Role.name) private roleModel: Model<Role> ) {}
  async create(createRoleDto: CreateRoleDto) {
    return await this.roleModel.create(createRoleDto)
  }

  async findAll() {
    return await this.roleModel.find({deleted: false})
  }

  async findOne(id: string) {
    return await this.roleModel.findOne({_id: id, deleted: false})
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);
    if(!role){
      throw new NotFoundException("Role is not found")
    }
    Object.assign(role, updateRoleDto)
    await role.save()
    return role
  }

  async remove(id: string) {
    const role = await this.roleModel.findOneAndUpdate({_id: id}, {deleted: true});
    if(!role){
      throw new NotFoundException("Role is not found")
    }
    
  }
}
