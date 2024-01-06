import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { ResponseFromServiceI } from 'shared/interfaces/general/response-from-service.interface';
import { Country } from './entities/country.entity';

/**
 * No need for repos no?
 */
@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(SCHEMAS.COUNTRIES)
    private readonly countryModel: Model<Country>,
  ) {}

  async findAll(): Promise<ResponseFromServiceI<Country[]>> {
    const countries = await this.countryModel
      .find<Country>()
      .select({
        flag: 1,
        phoneLength: 1,
        nameEn: 1,
        nameAr: 1,
        dialCode: 1,
        isoCode: 1,

        _id: 0,
      })
      .exec();

    return {
      httpStatus: HttpStatus.CREATED,
      message: {
        translationKey: 'shared.success.create',
        args: { entity: 'entities.country' },
      },
      data: countries,
    };
  }
}
