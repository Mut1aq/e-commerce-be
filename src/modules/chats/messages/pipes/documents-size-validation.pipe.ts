import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { MAX_DOCUMENT_FILE_SIZE_IN_BYTES } from 'shared/constants/validation-helpers.constant';

@Injectable()
export class DocumentsSizeValidationPipe implements PipeTransform {
  transform(documents: Express.Multer.File[], _metadata: ArgumentMetadata) {
    if ((documents ?? []).length < 1)
      throw new HttpException(
        'documents must be provided',
        HttpStatus.BAD_REQUEST,
      );

    for (const document of documents) {
      const { size, originalname } = document;
      if (size > MAX_DOCUMENT_FILE_SIZE_IN_BYTES)
        throw new HttpException(
          `maximum allowed size is ${MAX_DOCUMENT_FILE_SIZE_IN_BYTES} bytes, and the file ${originalname} is ${size} bytes`,
          HttpStatus.BAD_REQUEST,
        );
    }

    return documents;
  }
}
