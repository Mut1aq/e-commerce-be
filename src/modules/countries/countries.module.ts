import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { countryMongooseModel } from './entities/country.entity';

@Module({
  controllers: [CountriesController],
  providers: [CountriesService],
  imports: [MongooseModule.forFeature([countryMongooseModel])],
})
export class CountriesModule {}
