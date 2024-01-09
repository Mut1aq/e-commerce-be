import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { categoryMongooseModel } from './entities/category.entity';
import { StoresModule } from '../stores/stores.module';
import { StoreOwnersModule } from 'modules/system-users/store-owners/store-owners.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
  imports: [
    MongooseModule.forFeature([categoryMongooseModel]),
    StoresModule,
    StoreOwnersModule,
  ],
})
export class CategoriesModule {}
