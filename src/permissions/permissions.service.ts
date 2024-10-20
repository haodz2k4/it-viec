import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from './schemas/permission.schema';
import { Model } from 'mongoose';

@Injectable()
export class PermissionsService {

  constructor(@InjectModel(Permission.name) private permission: Model<Permission>) {}
  async create(createPermissionDto: CreatePermissionDto) {
    return await this.permission.create(createPermissionDto)
  }

  async findAll() {
    return await this.permission.find({deleted: false})
  }

  async findOneById(id: string) {
    return await this.permission.findOne({_id: id, deleted: false})
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.findOneById(id);
    if(!permission){
      throw new NotFoundException("Permissions is not found")
    }
    Object.assign(permission, updatePermissionDto);
    await permission.save()
    return permission
  }

  async remove(id: string) {
    const permission = await this.permission.findByIdAndUpdate(id,{deleted: true});
    if(!permission){
      throw new NotFoundException("Permission is not found")
    }
    
  }
}
