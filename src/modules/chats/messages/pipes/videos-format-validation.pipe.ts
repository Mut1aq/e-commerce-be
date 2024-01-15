import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class VideosFormatValidationPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    return value;
  }
}
