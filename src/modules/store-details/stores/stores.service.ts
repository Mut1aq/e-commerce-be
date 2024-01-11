import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StoreOwnersService } from 'modules/system-users/store-owners/store-owners.service';
import { Model, Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';
import { StoreDocument } from './types/store-document.type';

@Injectable()
export class StoresService {
  constructor(
    @InjectModel(SCHEMAS.STORE) private readonly storeModel: Model<Store>,

    private readonly storeOwnersService: StoreOwnersService,
  ) {}
  async create(createStoreDto: CreateStoreDto, storeOwnerID: string) {
    const storeOwner = await this.storeOwnersService.findByID(storeOwnerID);

    if (!storeOwner)
      throw new HttpException(
        "Store Owner Doesn't exist",
        HttpStatus.NOT_FOUND,
      );

    const storeToCreate = new this.storeModel(createStoreDto);
    storeToCreate.author = storeOwner;

    const createdStore = await storeToCreate.save();
    storeOwner.storeOwnerProperties?.stores.push(
      new Types.ObjectId(createdStore._id) as unknown as StoreDocument,
    );

    await storeOwner.save();

    return {
      data: createdStore.toObject({ flattenObjectIds: true }),
      httpStatus: HttpStatus.CREATED,
      message: {
        translationKey: 'shared.success.create',
        args: { entity: 'entities.store' },
      },
    };
  }

  findAll() {
    return `This action returns all store`;
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, _updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }

  findByIDAndStoreOwner(
    storeID: string,
    storeOwnerID: string,
  ): Promise<StoreDocument | null> {
    return this.storeModel
      .findOne<StoreDocument>({
        _id: new Types.ObjectId(storeID),
        author: new Types.ObjectId(storeOwnerID),
      })
      .exec();
  }
}
