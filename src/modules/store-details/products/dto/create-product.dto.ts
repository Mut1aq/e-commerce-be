import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  MinLength,
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  Min,
  Max,
  IsNumber,
  IsOptional,
  IsInt,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'resources/generated/i18n.generated';

export class CreateProductDto {
  @ApiProperty({
    description: "Product's name",
    example: "mut1aq's product",
    isArray: false,
    maxLength: 30,
    minLength: 3,
    name: 'name',
    required: true,
    type: String,
  })
  @MaxLength(30, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 30,
    }),
  })
  @MinLength(3, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      min: 3,
    }),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  name!: string;

  @ApiProperty({
    description: "Product's description",
    example: "mut1aq's product",
    isArray: false,
    maxLength: 2200,
    minLength: 10,
    name: 'description',
    required: true,
    type: String,
  })
  @MaxLength(2200, {
    message: i18nValidationMessage<I18nTranslations>('validation.maxLength', {
      max: 2200,
    }),
  })
  @MinLength(10, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      min: 10,
    }),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  description!: string;

  @ApiProperty({
    description: "Product's photos",
    example: 'https:',
    isArray: false,
    maxLength: 2048,
    minLength: 3,
    name: 'photos',
    required: false,
    type: String,
  })
  @MaxLength(2048, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 2048,
    }),
    each: true,
  })
  @MinLength(3, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      min: 3,
    }),
    each: true,
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
    each: true,
  })
  @ArrayMinSize(1)
  @IsArray()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
    each: true,
  })
  photos?: string[];

  @ApiProperty({
    description: "Product's videos",
    example: 'https:',
    isArray: false,
    maxLength: 2048,
    minLength: 3,
    name: 'videos',
    required: false,
    type: String,
  })
  @MaxLength(2048, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 2048,
    }),
    each: true,
  })
  @MinLength(3, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      min: 3,
    }),
    each: true,
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
    each: true,
  })
  @ArrayMinSize(1)
  @IsArray()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
    each: true,
  })
  videos?: string[];

  @ApiProperty({
    description: "Product's price",
    example: 50.5,
    isArray: false,
    minimum: 0,
    maximum: 99999,
    name: 'price',
    required: true,
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
  price!: number;

  @ApiProperty({
    description: "Product's quantity",
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

  @ApiProperty({
    description: "Product's discountedPrice",
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
  discountedPrice?: number;

  @ApiProperty({
    description: "Product's discountedRate",
    example: 50,
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
  @IsInt()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
    each: true,
  })
  @IsOptional()
  discountedRate?: number;
}
