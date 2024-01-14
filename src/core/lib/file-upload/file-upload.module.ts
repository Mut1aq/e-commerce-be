import { DynamicModule, Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { Global } from '@nestjs/common';

@Global()
@Module({})
export class FileUploadModule {
  static register(): DynamicModule {
    const dynamicImports = [];
    switch (process.env.CLOUD_SOLUTION!) {
      case 'CLOUDINARY':
        dynamicImports.push(CloudinaryModule);
        break;
    }

    return {
      providers: [FileUploadService],
      exports: [FileUploadService],
      imports: dynamicImports,
      module: FileUploadModule,
    };
  }
}
