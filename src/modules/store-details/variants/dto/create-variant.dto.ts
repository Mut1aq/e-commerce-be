import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsHexColor,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'resources/generated/i18n.generated';

export class CreateVariantDto {
  @ApiProperty({
    description: "variant's size",
    example: 'x-large',
    isArray: false,
    maxLength: 50,
    minLength: 1,
    name: 'size',
    required: false,
    type: String,
  })
  @MaxLength(50, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 50,
    }),
  })
  @MinLength(1, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      min: 1,
    }),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
  })
  @Transform((param) => (param.value ?? '').toLowerCase().trim())
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  @IsOptional()
  size?: string;

  @ApiProperty({
    description: "variant's color",
    example: '#fff',
    isArray: false,
    maxLength: 7,
    minLength: 4,
    name: 'color',
    required: false,
    type: String,
  })
  @IsHexColor()
  @MaxLength(7, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 7,
    }),
  })
  @MinLength(4, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      min: 4,
    }),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
  })
  @Transform((param) => (param.value ?? '').toLowerCase().trim())
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  @IsOptional()
  color?: string;

  @ApiProperty({
    description: "variant's material",
    example: 'rubber',
    isArray: false,
    maxLength: 50,
    minLength: 1,
    name: 'material',
    required: false,
    type: String,
  })
  @MaxLength(50, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 50,
    }),
  })
  @MinLength(1, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      min: 1,
    }),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
  })
  @Transform((param) => (param.value ?? '').toLowerCase().trim())
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  @IsOptional()
  material?: string;

  @ApiProperty({
    description: "variant's style",
    example: 'classic',
    isArray: false,
    maxLength: 50,
    minLength: 1,
    name: 'style',
    required: false,
    type: String,
  })
  @MaxLength(50, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 50,
    }),
  })
  @MinLength(1, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      min: 1,
    }),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
  })
  @Transform((param) => (param.value ?? '').toLowerCase().trim())
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  @IsOptional()
  style?: string;

  @ApiProperty({
    description: "Variant's price",
    example: 50.5,
    isArray: false,
    minimum: 0,
    maximum: 100000,
    name: 'price',
    required: false,
    type: Number,
  })
  @Max(100000, {
    message: i18nValidationMessage<I18nTranslations>('validation.max', {
      min: 100000,
    }),
  })
  @Min(0, {
    message: i18nValidationMessage<I18nTranslations>('validation.min', {
      min: 0,
    }),
  })
  @IsNumber()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
    each: true,
  })
  @IsOptional()
  price!: number;

  @ApiProperty({
    description: "Variant's discountedPrice",
    example: 50.5,
    isArray: false,
    minimum: 0,
    maximum: 99999,
    name: 'discountedPrice',
    required: false,
    type: Number,
  })
  @Max(99999, {
    message: i18nValidationMessage<I18nTranslations>('validation.max', {
      min: 99999,
    }),
  })
  @Min(0, {
    message: i18nValidationMessage<I18nTranslations>('validation.min', {
      min: 0,
    }),
  })
  @IsNumber()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
    each: true,
  })
  @IsOptional()
  discountedPrice!: number;

  @ApiProperty({
    description: "Variant's discountedRate",
    example: 50.5,
    isArray: false,
    minimum: 1,
    maximum: 99,
    name: 'discountedRate',
    required: false,
    type: Number,
  })
  @Max(99, {
    message: i18nValidationMessage<I18nTranslations>('validation.max', {
      min: 99,
    }),
  })
  @Min(1, {
    message: i18nValidationMessage<I18nTranslations>('validation.min', {
      min: 1,
    }),
  })
  @IsNumber()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
    each: true,
  })
  @IsOptional()
  discountedRate!: number;

  @ApiProperty({
    description: "Variant's quantity",
    example: 50.5,
    isArray: false,
    minimum: 0,
    maximum: 10000,
    name: 'quantity',
    required: false,
    type: Number,
  })
  @Max(10000, {
    message: i18nValidationMessage<I18nTranslations>('validation.max', {
      min: 10000,
    }),
  })
  @Min(0, {
    message: i18nValidationMessage<I18nTranslations>('validation.min', {
      min: 0,
    }),
  })
  @IsInt()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
    each: true,
  })
  quantity!: number;
}
