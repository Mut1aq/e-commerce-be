import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { Role } from 'shared/enums/role.enum';
import { User } from '../users/entities/user.entity';
import { UserDocument } from '../users/types/user-document.type';
import { CreateStoreOwnerDto } from './dto/create-store-owner.dto';
import { UpdateStoreOwnerDto } from './dto/update-store-owner.dto';

@Injectable()
export class StoreOwnersService {
  constructor(
    @InjectModel(SCHEMAS.USER) private readonly storeOwnerModel: Model<User>,
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

  findByID(userID: string): Promise<UserDocument | null> {
    return this.storeOwnerModel
      .findOne<UserDocument>({
        _id: new Types.ObjectId(userID),
        role: Role.STORE_OWNER,
      })
      .exec();
  }

  // findByID(
  //   userID: string,
  //   permission: Partial<PermissionI> & { [key: string]: Action[] },
  // ): Promise<UserDocument | null> {
  //   const domain = Object.keys(permission)[0];
  //   return this.storeOwnerModel
  //     .findOne<UserDocument>({
  //       $and: [
  //         {
  //           $or: [
  //             {
  //               $and: [
  //                 {
  //                   ['storeEmployeeProperties.permission' + domain]: {
  //                     $in: permission[domain],
  //                   },
  //                 },
  //                 {
  //                   role: Role.STORE_EMPLOYEE,
  //                 },
  //               ],
  //             },

  //             {
  //               role: Role.STORE_OWNER,
  //             },
  //           ],
  //         },
  //         {
  //           _id: new Types.ObjectId(userID),
  //         },
  //       ],
  //     })
  //     .exec();
  // }
}
