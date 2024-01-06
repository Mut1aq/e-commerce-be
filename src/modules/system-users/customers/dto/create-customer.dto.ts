import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  MaxLength,
  MinLength,
  IsString,
  IsNotEmpty,
  MaxDate,
} from 'class-validator';
import { CreateUserDto } from 'modules/system-users/users/dto/create-user.dto';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'resources/generated/i18n.generated';
import { thirteenYearsAgo } from 'shared/util/date.util';

export class CreateCustomerDto extends CreateUserDto {
  @ApiProperty({
    description: "User's username",
    example: 'mut1aq',
    isArray: false,
    maxLength: 30,
    minLength: 3,
    name: 'username',
    required: true,
    type: String,
  })
  @Transform((param) => (param.value ?? '').toLowerCase().trim())
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
  username!: string;

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
      min: 2,
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
}
