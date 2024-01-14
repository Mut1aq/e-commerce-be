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
export class ProfilePictureFormatValidationPipe
  implements PipeTransform<Express.Multer.File, Express.Multer.File>
{
  transform(profilePicture: Express.Multer.File, _: ArgumentMetadata) {
    const { originalname } = profilePicture;
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

    return profilePicture;
  }
}
