import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { extname } from 'path';
import { ALLOWED_IMAGE_FORMATS } from 'shared/constants/validation-helpers.constant';

@Injectable()
export class VoiceFormatValidationPipe
  implements
    PipeTransform<Express.Multer.File, Express.Multer.File | undefined>
{
  transform(voice: Express.Multer.File, _: ArgumentMetadata) {
    if (!voice) return;

    const { originalname } = voice;
    const profilePictureExtension = extname(originalname);
    const isProfilePictureExtensionAllowed = ALLOWED_IMAGE_FORMATS.includes(
      profilePictureExtension,
    );
    if (!isProfilePictureExtensionAllowed)
      throw new HttpException(
        `allowed formats are ${ALLOWED_IMAGE_FORMATS.join(
          ', ',
        )}, and the file ${originalname} is ${profilePictureExtension}`,
        HttpStatus.BAD_REQUEST,
      );

    return voice;
  }
}
