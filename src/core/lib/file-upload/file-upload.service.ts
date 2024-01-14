import { Injectable } from '@nestjs/common';
import { MediaObjectI } from 'shared/interfaces/db/media-object.interface';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Injectable()
export class FileUploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  uploadProfilePicture(
    file: Express.Multer.File,
    userID: string,
  ): Promise<MediaObjectI> {
    return this.cloudinaryService.uploadProfilePicture(file, userID, [
      'Image',
      'User',
      'Profile Picture',
    ]);
  }
}
