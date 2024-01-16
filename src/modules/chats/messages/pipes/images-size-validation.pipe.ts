import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { MAX_IMAGE_FILE_SIZE_IN_BYTES } from 'shared/constants/validation-helpers.constant';

@Injectable()
export class ImagesSizeValidationPipe implements PipeTransform {
  transform(images: Express.Multer.File[], _metadata: ArgumentMetadata) {
    if ((images ?? []).length < 1)
      throw new HttpException(
        'documents must be provided',
        HttpStatus.BAD_REQUEST,
      );

    for (const image of images) {
      const { size, originalname } = image;
      if (size > MAX_IMAGE_FILE_SIZE_IN_BYTES)
        throw new HttpException(
          `maximum allowed size is ${MAX_IMAGE_FILE_SIZE_IN_BYTES} bytes, and the file ${originalname} is ${size} bytes`,
          HttpStatus.BAD_REQUEST,
        );
    }

    return images;
  }
}
