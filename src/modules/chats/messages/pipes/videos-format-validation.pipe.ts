import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { extname } from 'path';
import { ALLOWED_VIDEO_FORMATS } from 'shared/constants/validation-helpers.constant';

@Injectable()
export class VideosFormatValidationPipe implements PipeTransform {
  transform(videos: Express.Multer.File[], _metadata: ArgumentMetadata) {
    if ((videos ?? []).length < 1)
      throw new HttpException(
        'documents must be provided',
        HttpStatus.BAD_REQUEST,
      );

    for (const video of videos) {
      const { originalname } = video;
      const videoExtension = extname(originalname);
      const isVideoExtensionAllowed =
        ALLOWED_VIDEO_FORMATS.includes(videoExtension);
      if (!isVideoExtensionAllowed)
        throw new HttpException(
          `allowed formats are ${ALLOWED_VIDEO_FORMATS.join(
            ', ',
          )}, and the file ${originalname} is ${videoExtension}`,
          HttpStatus.BAD_REQUEST,
        );
    }

    return videos;
  }
}
