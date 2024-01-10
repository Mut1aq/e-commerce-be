import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'resources/generated/i18n.generated';
import { CreateVariantDto } from './create-variant.dto';

export class CreateVariantsDto {
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  @Type(() => CreateVariantDto)
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  variants!: CreateVariantDto[];
}
