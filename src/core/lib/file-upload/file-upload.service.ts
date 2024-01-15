import { Injectable } from '@nestjs/common';
import { MediaObjectI } from 'shared/interfaces/db/media-object.interface';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Injectable()
export class FileUploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  uploadProfilePictureForUser(
    file: Express.Multer.File,
    userID: string,
  ): Promise<MediaObjectI> {
    return this.cloudinaryService.uploadProfilePictureForUser(file, userID, [
      'Image',
      'User',
      'Profile Picture',
    ]);
  }

  uploadVoiceForMessage(
    file: Express.Multer.File,
    userID: string,
  ): Promise<MediaObjectI> {
    return this.cloudinaryService.uploadVoiceForMessage(file, userID, [
      'Image',
      'User',
      'Profile Picture',
    ]);
  }

  async uploadDocumentsForMessage(
    documents: Express.Multer.File[],
    roomID: string,
  ): Promise<MediaObjectI[]> {
    const files = documents.map((document) =>
      this.cloudinaryService.uploadDocumentsForMessage(document, roomID, [
        'Chat',
        'Message',
        'documents',
      ]),
    );
    const [...uploadedFiles] = await Promise.all(files);

    return uploadedFiles;
  }

  async uploadImagesForMessage(
    images: Express.Multer.File[],
    roomID: string,
  ): Promise<MediaObjectI[]> {
    const files = images.map((image) =>
      this.cloudinaryService.uploadImagesForMessage(image, roomID, [
        'Chat',
        'Message',
        'images',
      ]),
    );
    const [...uploadedFiles] = await Promise.all(files);

    return uploadedFiles;
  }

  async uploadVideosForMessage(
    videos: Express.Multer.File[],
    roomID: string,
  ): Promise<MediaObjectI[]> {
    const files = videos.map((video) =>
      this.cloudinaryService.uploadVideosForMessage(video, roomID, [
        'Chat',
        'Message',
        'videos',
      ]),
    );
    const [...uploadedFiles] = await Promise.all(files);

    return uploadedFiles;
  }

  deleteResource(resourceID: unknown) {
    return this.cloudinaryService.deleteResource(resourceID);
  }
}
