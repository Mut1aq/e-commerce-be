import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { MAX_VIDEO_FILE_SIZE_IN_BYTES } from 'shared/constants/validation-helpers.constant';

@Injectable()
export class VideosSizeValidationPipe implements PipeTransform {
  transform(videos: Express.Multer.File[], _metadata: ArgumentMetadata) {
    if ((videos ?? []).length < 1)
      throw new HttpException(
        'documents must be provided',
        HttpStatus.BAD_REQUEST,
      );

    for (const video of videos) {
      const { size, originalname } = video;
      if (size > MAX_VIDEO_FILE_SIZE_IN_BYTES)
        throw new HttpException(
          `maximum allowed size is ${MAX_VIDEO_FILE_SIZE_IN_BYTES} bytes, and the file ${originalname} is ${size} bytes`,
          HttpStatus.BAD_REQUEST,
        );
    }

    return videos;
  }
}
