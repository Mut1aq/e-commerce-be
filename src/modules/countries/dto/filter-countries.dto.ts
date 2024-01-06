import { IsOptional } from 'class-validator';
import { FilterDto } from 'shared/dtos/filter.dto';

export class FilterCountriesDto extends FilterDto {
  @IsOptional() name!: string;
}
