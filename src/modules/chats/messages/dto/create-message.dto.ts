import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  MinLength,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'resources/generated/i18n.generated';

export class CreateMessageDto {
  @ApiProperty({
    description: "Message's text",
    example: "mut1aq's Message",
    isArray: false,
    maxLength: 2200,
    minLength: 1,
    name: 'text',
    required: false,
    type: String,
  })
  @MaxLength(2200, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 2200,
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
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  @IsOptional()
  text?: string;
}
