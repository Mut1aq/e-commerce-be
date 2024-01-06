import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  MaxLength,
  MinLength,
  IsEmail,
  IsString,
  IsNotEmpty,
  MaxDate,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'resources/generated/i18n.generated';
import { thirteenYearsAgo } from 'shared/util/date.util';

export class CreateStoreOwnerDto {
  @ApiProperty({
    description: "User's email",
    example: 'mut1aq@gmail.com',
    isArray: false,
    maxLength: 320,
    minLength: 5,
    name: 'email',
    required: true,
    type: String,
  })
  @Transform((param) => (param.value ?? '').toLowerCase().trim())
  @MaxLength(320, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 320,
    }),
  })
  @MinLength(5, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      min: 5,
    }),
  })
  @IsEmail(undefined, {
    message: i18nValidationMessage<I18nTranslations>('validation.email'),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  email!: string;

  @ApiProperty({
    description: "User's firstName",
    example: 'mut1aq',
    isArray: false,
    maxLength: 50,
    minLength: 2,
    name: 'firstName',
    required: true,
    type: String,
  })
  @MaxLength(50, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 50,
    }),
  })
  @MinLength(2, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      min: 2,
    }),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  firstName!: string;

  @ApiProperty({
    description: "User's lastName",
    example: 'mut1aq',
    isArray: false,
    maxLength: 50,
    minLength: 2,
    name: 'lastName',
    required: true,
    type: String,
  })
  @MaxLength(50, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 50,
    }),
  })
  @MinLength(2, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      min: 2,
    }),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  lastName!: string;

  @ApiProperty({
    description: "User's birthday",
    type: 'date string',
    required: true,
    example: 'MM/DD/YYYY',
    name: 'birthday',
    minimum: 13,
  })
  @Transform(({ value }) => new Date(value))
  @MaxDate(thirteenYearsAgo())
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty', {
      property: 'Birth Day',
    }),
  })
  birthday!: string;

  @ApiProperty({
    description: "User's phoneNumber",
    example: '0795367929',
    isArray: false,
    maxLength: 18,
    minLength: 6,
    name: 'phoneNumber',
    required: true,
    type: String,
  })
  @MaxLength(18, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 18,
    }),
  })
  @MinLength(6, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      min: 6,
    }),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  phoneNumber!: string;

  @ApiProperty({
    description: "User's identity",
    example: 'google.com',
    isArray: false,
    maxLength: 2048,
    minLength: 3,
    name: 'identity',
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
  identity!: string;
}
