import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { extname } from 'path';
import { ALLOWED_DOCUMENT_FORMATS } from 'shared/constants/validation-helpers.constant';

@Injectable()
export class DocumentsFormatValidationPipe implements PipeTransform {
  transform(documents: Express.Multer.File[], _metadata: ArgumentMetadata) {
    if ((documents ?? []).length < 1)
      throw new HttpException(
        'documents must be provided',
        HttpStatus.BAD_REQUEST,
      );

    for (const document of documents) {
      const { originalname } = document;
      const documentExtension = extname(originalname);
      const isDocumentExtensionAllowed =
        ALLOWED_DOCUMENT_FORMATS.includes(documentExtension);
      if (!isDocumentExtensionAllowed)
        throw new HttpException(
          `allowed formats are ${ALLOWED_DOCUMENT_FORMATS.join(
            ', ',
          )}, and the file ${originalname} is ${documentExtension}`,
          HttpStatus.BAD_REQUEST,
        );
    }

    return documents;
  }
}
