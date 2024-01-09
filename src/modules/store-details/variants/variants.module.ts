import { Module } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { VariantsController } from './variants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { variantMongooseModel } from './entities/variant.entity';
import { StoreOwnersModule } from 'modules/system-users/store-owners/store-owners.module';

@Module({
  controllers: [VariantsController],
  providers: [VariantsService],
  imports: [
    MongooseModule.forFeature([variantMongooseModel]),
    StoreOwnersModule,
  ],
})
export class VariantsModule {}
