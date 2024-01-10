import { Module } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { VariantsController } from './variants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { variantMongooseModel } from './entities/variant.entity';
import { StoreOwnersModule } from 'modules/system-users/store-owners/store-owners.module';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [VariantsController],
  providers: [VariantsService],
  imports: [
    MongooseModule.forFeature([variantMongooseModel]),
    StoreOwnersModule,
    ProductsModule,
  ],
})
export class VariantsModule {}
