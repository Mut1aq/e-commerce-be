import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { productMongooseModel } from './entities/product.entity';
import { StoreOwnersModule } from 'modules/system-users/store-owners/store-owners.module';
import { CategoriesModule } from '../categories/categories.module';
import { VariantsModule } from '../variants/variants.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
  imports: [
    MongooseModule.forFeature([productMongooseModel]),
    StoreOwnersModule,
    CategoriesModule,
    forwardRef(() => VariantsModule),
  ],
})
export class ProductsModule {}
