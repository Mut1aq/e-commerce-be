import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'resources/generated/i18n.generated';
import { Action } from 'shared/enums/action.enum';

export class CreatePermissionDto {
  @ApiProperty({
    type: 'array of enums',
    description: 'Array of action enums to describe permission on store domain',
    isArray: true,
    required: true,
    enum: Action,
    name: 'store',
    example: [Action.CREATE, Action.DELETE],
    maxItems: 5,
    minItems: 5,
  })
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  @IsEnum(Action, { each: true })
  @IsArray()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  store!: Action[];

  @ApiProperty({
    type: 'array of enums',
    description:
      'Array of action enums to describe permission on category domain',
    isArray: true,
    required: true,
    enum: Action,
    name: 'category',
    example: [Action.CREATE, Action.DELETE],
    maxItems: 5,
    minItems: 5,
  })
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  @IsEnum(Action, { each: true })
  @IsArray()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  category!: Action[];

  @ApiProperty({
    type: 'array of enums',
    description:
      'Array of action enums to describe permission on product domain',
    isArray: true,
    required: true,
    enum: Action,
    name: 'product',
    example: [Action.CREATE, Action.DELETE],
    maxItems: 5,
    minItems: 5,
  })
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  @IsEnum(Action, { each: true })
  @IsArray()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  product!: Action[];

  @ApiProperty({
    type: 'array of enums',
    description:
      'Array of action enums to describe permission on variant domain',
    isArray: true,
    required: true,
    enum: Action,
    name: 'variant',
    example: [Action.CREATE, Action.DELETE],
    maxItems: 5,
    minItems: 5,
  })
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  @IsEnum(Action, { each: true })
  @IsArray()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  variant!: Action[];

  @ApiProperty({
    type: 'array of enums',
    description: 'Array of action enums to describe permission on order domain',
    isArray: true,
    required: true,
    enum: Action,
    name: 'order',
    example: [Action.CREATE, Action.DELETE],
    maxItems: 5,
    minItems: 5,
  })
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  @IsEnum(Action, { each: true })
  @IsArray()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  order!: Action[];

  @ApiProperty({
    type: 'array of enums',
    description:
      'Array of action enums to describe permission on review domain',
    isArray: true,
    required: true,
    enum: Action,
    name: 'review',
    example: [Action.CREATE, Action.DELETE],
    maxItems: 5,
    minItems: 5,
  })
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  @IsEnum(Action, { each: true })
  @IsArray()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  review!: Action[];

  @ApiProperty({
    type: 'array of enums',
    description:
      'Array of action enums to describe permission on employee domain',
    isArray: true,
    required: true,
    enum: Action,
    name: 'employee',
    example: [Action.CREATE, Action.DELETE],
    maxItems: 5,
    minItems: 5,
  })
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  @IsEnum(Action, { each: true })
  @IsArray()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  employee!: Action[];
}
