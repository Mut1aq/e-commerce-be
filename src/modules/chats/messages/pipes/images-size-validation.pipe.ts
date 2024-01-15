import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImagesSizeValidationPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    return value;
  }
}
