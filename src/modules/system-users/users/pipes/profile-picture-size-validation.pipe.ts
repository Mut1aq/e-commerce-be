import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MAX_IMAGE_FILE_SIZE_IN_MG } from 'shared/constants/validation-helpers.constant';

@Injectable()
export class ProfilePictureSizeValidationPipe
  implements
    PipeTransform<Express.Multer.File, Express.Multer.File | undefined>
{
  transform(profilePicture: Express.Multer.File, _: ArgumentMetadata) {
    if (!profilePicture) return;
    const { size, originalname } = profilePicture;
    if (size > MAX_IMAGE_FILE_SIZE_IN_MG)
      throw new HttpException(
        `maximum allowed size is ${MAX_IMAGE_FILE_SIZE_IN_MG} bytes, and the file ${originalname} is ${size} bytes`,
        HttpStatus.BAD_REQUEST,
      );
    return profilePicture;
  }
}
