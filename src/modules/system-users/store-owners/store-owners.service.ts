import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { Role } from 'shared/enums/role.enum';
import { User } from '../users/entities/user.entity';
import { CreateStoreOwnerDto } from './dto/create-store-owner.dto';
import { UpdateStoreOwnerDto } from './dto/update-store-owner.dto';

@Injectable()
export class StoreOwnersService {
  constructor(
    @InjectModel(SCHEMAS.USERS) private readonly storeOwnerModel: Model<User>,
  ) {}
  createStoreOwnerForAuth(createStoreOwnerDto: CreateStoreOwnerDto) {
    const { email, password, ...restOfCreateStoreOwnerDto } =
      createStoreOwnerDto as CreateStoreOwnerDto & {
        password: string;
      };
    const createdStoreOwner = new this.storeOwnerModel({ email, password });
    createdStoreOwner.role = Role.STORE_OWNER;
    createdStoreOwner.storeOwnerProperties = {
      ...restOfCreateStoreOwnerDto,
      stores: [],
    };
    return createdStoreOwner.save();
  }

  findAll() {
    return `This action returns all storeOwners`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storeOwner`;
  }

  update(id: number, _updateStoreOwnerDto: UpdateStoreOwnerDto) {
    return `This action updates a #${id} storeOwner`;
  }

  remove(id: number) {
    return `This action removes a #${id} storeOwner`;
  }
}
