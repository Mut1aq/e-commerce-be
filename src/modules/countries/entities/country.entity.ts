import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GeoJson, Timezones } from '../interfaces/country.interface';

@Schema({
  timestamps: true,
})
export class Country {
  @Prop({
    type: String,
    maxlength: 8,
    minlength: 2,
    trim: true,
    required: true,
  })
  dialCode!: string;

  @Prop({
    type: String,
    maxlength: 2,
    minlength: 2,
    trim: true,
    required: true,
  })
  isoCode!: string;

  @Prop({
    type: String,
    maxlength: 77,
    minlength: 52,
    trim: true,
    required: true,
  })
  flag!: string;

  @Prop({
    type: String,
    maxlength: 77,
    minlength: 52,
    trim: true,
    required: true,
  })
  secondFlag!: string;

  @Prop({
    type: String,
    maxlength: 44,
    minlength: 4,
    trim: true,
    required: true,
  })
  nameEn!: string;

  @Prop({
    type: String,
    maxlength: 38,
    minlength: 3,
    trim: true,
    required: true,
  })
  nameAr!: string;

  @Prop({
    type: String,
    maxlength: 9,
    minlength: 4,
    trim: true,
    required: true,
  })
  region!: string;

  @Prop({
    type: Number,
    max: 15,
    min: 4,
    required: true,
  })
  phoneLength!: string;

  @Prop({
    type: String,
    maxlength: 50,
    minlength: 1,
    required: false,
  })
  emoji?: string;

  @Prop({
    type: Object,
    required: false,
  })
  timezones?: Timezones;

  @Prop({
    type: Object,
    required: false,
  })
  geoJson?: GeoJson;
}

export const countrySchema = SchemaFactory.createForClass(Country);

export const countryMongooseModel = {
  name: Country.name,
  schema: countrySchema,
};
