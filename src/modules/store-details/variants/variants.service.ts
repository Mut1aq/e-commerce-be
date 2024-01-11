import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StoreOwnersService } from 'modules/system-users/store-owners/store-owners.service';
import { Model, Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { ProductsService } from '../products/products.service';
import { CreateVariantsDto } from './dto/create-variants.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { Variant } from './entities/variant.entity';
import { VariantDocument } from './types/variant-document.type';

@Injectable()
export class VariantsService {
  constructor(
    @InjectModel(SCHEMAS.VARIANT) private readonly variantModel: Model<Variant>,

    private readonly storeOwnersService: StoreOwnersService,

    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,
  ) {}
  async create(
    createVariantsDto: CreateVariantsDto,
    storeOwnerID: string,
    productID: string,
  ) {
    // TODO: Prevent Duplicate
    const { variants } = createVariantsDto;
    const [storeOwner, product] = await Promise.all([
      this.storeOwnersService.findByID(storeOwnerID),
      this.productsService.findByIDAndStoreOwner(productID, storeOwnerID),
    ]);

    if (!storeOwner)
      throw new HttpException(
        "Store Owner Doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    if (!product || !product.category || !product.category.store)
      throw new HttpException("product  Doesn't exist", HttpStatus.NOT_FOUND);

    const variantsToCreate = variants.map(
      (variant) =>
        new this.variantModel({ ...variant, author: storeOwner, product }),
    );
    const variantIDs = variantsToCreate.map(
      (variantToCreate) => variantToCreate._id,
    );
    product.variants.push(...(variantIDs as unknown as VariantDocument[]));
    const createdVariants =
      await this.variantModel.insertMany(variantsToCreate);

    await product.save();
    return {
      data: createdVariants.map((createdVariant) =>
        createdVariant.toObject({
          flattenObjectIds: true,
          depopulate: true,
        }),
      ),
      httpStatus: HttpStatus.CREATED,
      message: {
        translationKey: 'shared.success.create',
        args: { entity: 'entities.variant' },
      },
    };
  }

  findAll() {
    return `This action returns all variants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variant`;
  }

  async update(
    variantID: string,
    productID: string,
    updateVariantDto: UpdateVariantDto,
    storeOwnerID: string,
  ) {
    const [storeOwner, product] = await Promise.all([
      this.storeOwnersService.findByID(storeOwnerID),
      this.productsService.findByIDAndStoreOwnerAndPopulateVariants(
        productID,
        storeOwnerID,
      ),
    ]);

    if (!storeOwner)
      throw new HttpException(
        "Store Owner Doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    if (!product || !product.category || !product.category.store)
      throw new HttpException("product  Doesn't exist", HttpStatus.NOT_FOUND);

    const { variants } = product;
    const variantToUpdateIndex = variants.findIndex(
      (variant) => variant?._id + '' === variantID,
    );
    const variantToUpdate = variants.splice(variantToUpdateIndex, 1)[0];
    if (!variantToUpdateIndex)
      throw new HttpException("variant  Doesn't exist", HttpStatus.NOT_FOUND);

    const similarVariants = variants.filter(
      (variant) =>
        variant?.color === variantToUpdate.color &&
        variant?.size === variantToUpdate.size &&
        variant?.material === variantToUpdate.material &&
        variant?.style === variantToUpdate.style,
    );

    if (similarVariants.length > 0) {
      const similarVariantIDs = similarVariants.map(
        (variant) => new Types.ObjectId(variant._id),
      );
      const totalQuantity = [...similarVariants, variantToUpdate].reduce(
        (total, current) => (total += current.quantity),
        0,
      );

      await Promise.all([
        this.variantModel
          .deleteMany({ _id: { $in: similarVariantIDs } })
          .exec(),
        this.variantModel
          .updateOne(
            { _id: new Types.ObjectId(variantID) },
            { $set: { ...updateVariantDto, quantity: totalQuantity } },
          )
          .exec(),
        this.productsService.removeVariantsByIDs(productID, similarVariantIDs),
      ]);
    } else {
      await this.variantModel
        .updateOne(
          { _id: new Types.ObjectId(variantID) },
          { $set: { ...updateVariantDto } },
        )
        .exec();
    }

    return {
      data: variantToUpdate,
      httpStatus: HttpStatus.CREATED,
      message: {
        translationKey: 'shared.success.update',
        args: { entity: 'entities.variant' },
      },
    };
  }

  remove(id: number) {
    return `This action removes a #${id} variant`;
  }

  removeAllVariantsByProductID(productID: string) {
    return this.variantModel
      .deleteMany({ product: new Types.ObjectId(productID) })
      .exec();
  }
}
