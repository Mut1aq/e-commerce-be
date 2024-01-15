import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MAX_IMAGE_FILE_SIZE_IN_BYTES } from 'shared/constants/validation-helpers.constant';

@Injectable()
export class VoiceSizeValidationPipe
  implements
    PipeTransform<Express.Multer.File, Express.Multer.File | undefined>
{
  transform(voice: Express.Multer.File, _: ArgumentMetadata) {
    if (!voice) return;
    const { size, originalname } = voice;
    if (size > MAX_IMAGE_FILE_SIZE_IN_BYTES)
      throw new HttpException(
        `maximum allowed size is ${MAX_IMAGE_FILE_SIZE_IN_BYTES} bytes, and the file ${originalname} is ${size} bytes`,
        HttpStatus.BAD_REQUEST,
      );
    return voice;
  }
}
