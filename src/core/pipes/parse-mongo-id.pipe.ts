import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform<string, string> {
  transform(mongoID: string, _: ArgumentMetadata) {
    if (!isValidObjectId(mongoID))
      throw new HttpException('Invalid mongo ID', HttpStatus.BAD_REQUEST);

    return mongoID;
  }
}
