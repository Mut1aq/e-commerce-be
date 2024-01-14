import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'resources/generated/i18n.generated';

export class UpdateProfileDto {
  @ApiProperty({
    description: "User's email",
    example: 'mut1aq@gmail.com',
    isArray: false,
    maxLength: 320,
    minLength: 5,
    name: 'email',
    required: false,
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
  @IsOptional()
  email?: string;
}
