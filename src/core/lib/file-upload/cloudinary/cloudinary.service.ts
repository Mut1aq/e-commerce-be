import { Injectable } from '@nestjs/common';
import { v2, UploadApiResponse } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { MediaObjectI } from 'shared/interfaces/db/media-object.interface';

@Injectable()
export class CloudinaryService {
  async uploadProfilePictureForUser(
    file: Express.Multer.File,
    folderName: string,
    tags?: string[],
  ): Promise<MediaObjectI> {
    const uploadUploadedFile = await new Promise<UploadApiResponse | undefined>(
      (resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          {
            backup: true,
            folder: folderName,
            resource_type: 'image',
            tags,
            use_filename: true,
          },
          (error, success) => {
            if (error) reject(error);
            resolve(success);
          },
        );

        toStream(file.buffer).pipe(upload);
      },
    );

    const { secure_url, public_id, original_filename, format } =
      uploadUploadedFile!;
    const mediaObject: MediaObjectI = {
      url: secure_url,
      solutionID: public_id,
      fileName: original_filename,
      format,
    };

    return mediaObject;
  }

  async uploadVoiceForMessage(
    file: Express.Multer.File,
    folderName: string,
    tags?: string[],
  ): Promise<MediaObjectI> {
    const uploadUploadedFile = await new Promise<UploadApiResponse | undefined>(
      (resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          {
            backup: true,
            folder: folderName,
            resource_type: 'raw',
            tags,
            use_filename: true,
          },
          (error, success) => {
            if (error) reject(error);
            resolve(success);
          },
        );

        toStream(file.buffer).pipe(upload);
      },
    );

    const { secure_url, public_id, original_filename, format } =
      uploadUploadedFile!;
    const mediaObject: MediaObjectI = {
      url: secure_url,
      solutionID: public_id,
      fileName: original_filename,
      format,
    };

    return mediaObject;
  }

  async uploadDocumentsForMessage(
    file: Express.Multer.File,
    folderName: string,
    tags?: string[],
  ): Promise<MediaObjectI> {
    const uploadUploadedFile = await new Promise<UploadApiResponse | undefined>(
      (resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          {
            backup: true,
            folder: folderName,
            resource_type: 'raw',
            tags,
            use_filename: true,
          },
          (error, success) => {
            if (error) reject(error);
            resolve(success);
          },
        );

        toStream(file.buffer).pipe(upload);
      },
    );

    const { secure_url, public_id, original_filename, format } =
      uploadUploadedFile!;
    const mediaObject: MediaObjectI = {
      url: secure_url,
      solutionID: public_id,
      fileName: original_filename,
      format,
    };

    return mediaObject;
  }

  async uploadImagesForMessage(
    file: Express.Multer.File,
    folderName: string,
    tags?: string[],
  ): Promise<MediaObjectI> {
    const uploadUploadedFile = await new Promise<UploadApiResponse | undefined>(
      (resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          {
            backup: true,
            folder: folderName,
            resource_type: 'image',
            tags,
            use_filename: true,
          },
          (error, success) => {
            if (error) reject(error);
            resolve(success);
          },
        );

        toStream(file.buffer).pipe(upload);
      },
    );

    const { secure_url, public_id, original_filename, format } =
      uploadUploadedFile!;
    const mediaObject: MediaObjectI = {
      url: secure_url,
      solutionID: public_id,
      fileName: original_filename,
      format,
    };

    return mediaObject;
  }

  async uploadVideosForMessage(
    file: Express.Multer.File,
    folderName: string,
    tags?: string[],
  ): Promise<MediaObjectI> {
    const uploadUploadedFile = await new Promise<UploadApiResponse | undefined>(
      (resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          {
            backup: true,
            folder: folderName,
            resource_type: 'image',
            tags,
            use_filename: true,
          },
          (error, success) => {
            if (error) reject(error);
            resolve(success);
          },
        );

        toStream(file.buffer).pipe(upload);
      },
    );

    const { secure_url, public_id, original_filename, format } =
      uploadUploadedFile!;
    const mediaObject: MediaObjectI = {
      url: secure_url,
      solutionID: public_id,
      fileName: original_filename,
      format,
    };

    return mediaObject;
  }

  deleteResource(resourceID: unknown) {
    return v2.uploader.destroy(resourceID + '', {});
    // return new Promise((resolve, reject) => {
    //   return v2.uploader.destroy(resourceID + '', (err, success) => {
    //     if (err) reject(err);
    //     resolve(success);
    //   });
    // });
  }
}
