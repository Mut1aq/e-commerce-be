import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { Role } from 'shared/enums/role.enum';
import { User } from '../users/entities/user.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(SCHEMAS.USERS) private readonly adminModel: Model<User>,
  ) {}
  createAdminForAuth(createAdminDto: CreateAdminDto) {
    const createdAdmin = new this.adminModel(createAdminDto);
    createdAdmin.role = Role.ADMIN;
    createdAdmin.adminProperties = {
      deletedUsers: [],
      storeOwners: [],
      suspendedUsers: [],
    };
    return createdAdmin.save();
  }

  findAll() {
    return `This action returns all admins`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, _updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
