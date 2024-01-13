import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StoreOwnersService } from 'modules/system-users/store-owners/store-owners.service';
import { Model, Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { StoresService } from '../stores/stores.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryDocument } from './types/category-document.type';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(SCHEMAS.CATEGORY)
    private readonly categoryModel: Model<Category>,

    private readonly storeOwnersService: StoreOwnersService,

    private readonly storesService: StoresService,
  ) {}
  async create(
    createCategoryDto: CreateCategoryDto,
    storeOwnerID: string,
    storeID: string,
  ) {
    const [storeOwner, store] = await Promise.all([
      this.storeOwnersService.findByID(storeOwnerID),
      // this.storeOwnersService.findByID(storeOwnerID, createCategory),

      this.storesService.findByIDAndStoreOwner(storeID, storeOwnerID),
    ]);

    if (!storeOwner)
      throw new HttpException(
        "Store Owner Doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    if (!store)
      throw new HttpException("Store  Doesn't exist", HttpStatus.NOT_FOUND);

    const categoryToCreate = new this.categoryModel(createCategoryDto);
    categoryToCreate.store = store;
    categoryToCreate.author = storeOwner;
    const createdCategory = await categoryToCreate.save();

    store.categories.push(categoryToCreate._id as unknown as CategoryDocument);
    await store.save();

    return {
      data: createdCategory.toObject({
        flattenObjectIds: true,
        depopulate: true,
      }),
      httpStatus: HttpStatus.CREATED,
      message: {
        translationKey: 'shared.success.create',
        args: { entity: 'entities.category' },
      },
    };
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, _updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }

  findByIDAndStoreOwner(categoryID: string, storeOwnerID: string) {
    return this.categoryModel
      .findOne<CategoryDocument>({
        $and: [
          { _id: new Types.ObjectId(categoryID) },
          { author: new Types.ObjectId(storeOwnerID) },
        ],
      })
      .populate<CategoryDocument>({
        path: 'store',
        model: SCHEMAS.STORE,
        select: { author: 1 },
        match: { author: new Types.ObjectId(storeOwnerID) },
      })
      .exec();
  }

  async removeProductFromCategory(productID: string) {
    const category = await this.categoryModel
      .findOne<CategoryDocument>({ products: new Types.ObjectId(productID) })
      .exec();

    if (!category)
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);

    const productToDeleteIndex = category?.products.findIndex(
      (product) => product + '' === productID,
    );
    if (productToDeleteIndex === -1)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    category.products.splice(productToDeleteIndex, 1);
    return category.save();
  }
}
