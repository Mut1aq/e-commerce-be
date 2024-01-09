import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StoreOwnersService } from 'modules/system-users/store-owners/store-owners.service';
import { Model } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { CategoriesService } from '../categories/categories.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(SCHEMAS.PRODUCT) private readonly productModel: Model<Product>,
    private readonly storeOwnersService: StoreOwnersService,
    private readonly categoriesService: CategoriesService,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    categoryID: string,
    storeOwnerID: string,
  ) {
    const [storeOwner, category] = await Promise.all([
      this.storeOwnersService.findByID(storeOwnerID),
      this.categoriesService.findByIDAndStoreOwner(categoryID, storeOwnerID),
    ]);

    if (!storeOwner)
      throw new HttpException(
        "Store Owner Doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    if (!category)
      throw new HttpException("Category  Doesn't exist", HttpStatus.NOT_FOUND);

    const productToCreate = new this.productModel(createProductDto);
    productToCreate.author = storeOwner;
    productToCreate.category = category;
    const createdProduct = await productToCreate.save();

    category.products.push(createdProduct._id as unknown as Product);
    await category.save();

    return {
      data: createdProduct.toObject({
        flattenObjectIds: true,
        depopulate: true,
      }),
      httpStatus: HttpStatus.CREATED,
      message: {
        translationKey: 'shared.success.create',
        args: { entity: 'entities.product' },
      },
    };
  }

  findAll() {
    return `This action returns all products`;
  }

  findAllForCategory() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, _updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
