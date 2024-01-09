import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength, IsString, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'resources/generated/i18n.generated';

export class CreateStoreDto {
  @ApiProperty({
    description: "Store's name",
    example: 'mut1aq',
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
    description: "Store's logo",
    example: 'mut1aq',
    isArray: false,
    maxLength: 2048,
    minLength: 3,
    name: 'logo',
    required: true,
    type: String,
  })
  @MaxLength(2048, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 2048,
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
  logo!: string;

  @ApiProperty({
    description: "Store's coverPhoto",
    example: 'mut1aq',
    isArray: false,
    maxLength: 2048,
    minLength: 3,
    name: 'coverPhoto',
    required: true,
    type: String,
  })
  @MaxLength(2048, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 2048,
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
  coverPhoto!: string;

  @ApiProperty({
    description: "Store's phoneNumber",
    example: 'mut1aq',
    isArray: false,
    maxLength: 16,
    minLength: 8,
    name: 'phoneNumber',
    required: true,
    type: String,
  })
  @MaxLength(16, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 16,
    }),
  })
  @MinLength(8, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      min: 8,
    }),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  phoneNumber!: string;
}
