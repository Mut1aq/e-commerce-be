import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { extname } from 'path';
import { ALLOWED_IMAGE_FORMATS } from 'shared/constants/validation-helpers.constant';

@Injectable()
export class ImagesFormatValidationPipe implements PipeTransform {
  transform(images: Express.Multer.File[], _metadata: ArgumentMetadata) {
    if ((images ?? []).length < 1)
      throw new HttpException(
        'documents must be provided',
        HttpStatus.BAD_REQUEST,
      );

    for (const image of images) {
      const { originalname } = image;
      const imageExtension = extname(originalname);
      const isImageExtensionAllowed =
        ALLOWED_IMAGE_FORMATS.includes(imageExtension);
      if (!isImageExtensionAllowed)
        throw new HttpException(
          `allowed formats are ${ALLOWED_IMAGE_FORMATS.join(
            ', ',
          )}, and the file ${originalname} is ${imageExtension}`,
          HttpStatus.BAD_REQUEST,
        );
    }

    return images;
  }
}
