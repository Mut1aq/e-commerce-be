import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiTags } from '@nestjs/swagger';
import { ROUTES } from 'shared/constants/routes.constant';
import { ParseMongoIdPipe } from 'core/pipes/parse-mongo-id.pipe';
import { UserID } from 'core/decorators/user-id.decorator';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import {
  MAX_DOCUMENT_FILE_SIZE_IN_BYTES,
  MAX_IMAGE_FILE_SIZE_IN_BYTES,
  MAX_VIDEO_FILE_SIZE_IN_BYTES,
  MAX_VOICE_FILE_SIZE_IN_BYTES,
} from 'shared/constants/validation-helpers.constant';
import { DocumentsFormatValidationPipe } from './pipes/documents-format-validation.pipe';
import { ImagesFormatValidationPipe } from './pipes/images-format-validation.pipe';
import { ImagesSizeValidationPipe } from './pipes/images-size-validation.pipe';
import { VideosFormatValidationPipe } from './pipes/videos-format-validation.pipe';
import { VideosSizeValidationPipe } from './pipes/videos-size-validation.pipe';
import { VoiceFormatValidationPipe } from './pipes/voice-format-validation.pipe';
import { VoiceSizeValidationPipe } from './pipes/voice-size-validation.pipe';
import { DocumentsSizeValidationPipe } from './pipes/documents-size-validation.pipe';

@ApiTags(ROUTES.MESSAGES.CONTROLLER)
@Controller(ROUTES.MESSAGES.CONTROLLER)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post(ROUTES.MESSAGES.CREATE)
  create(
    @Body() createMessageDto: CreateMessageDto,
    @Param('roomID', new ParseMongoIdPipe()) roomID: string,
    @UserID() userID: string,
  ) {
    return this.messagesService.create(roomID, userID, createMessageDto);
  }

  @Post(ROUTES.MESSAGES.CREATE_WITH_DOCUMENTS)
  @UseInterceptors(
    FilesInterceptor('documents', 10, {
      limits: {
        files: 10,
        fields: 1,
        fileSize: MAX_DOCUMENT_FILE_SIZE_IN_BYTES,
      },
    }),
  )
  createWithDocuments(
    @Body() createMessageDto: CreateMessageDto,
    @Param('roomID', new ParseMongoIdPipe()) roomID: string,
    @UserID() userID: string,
    @UploadedFiles(
      new DocumentsSizeValidationPipe(),
      new DocumentsFormatValidationPipe(),
    )
    documents: Array<Express.Multer.File>,
  ) {
    return this.messagesService.createWithDocuments(
      roomID,
      userID,
      createMessageDto,
      documents,
    );
  }

  @Post(ROUTES.MESSAGES.CREATE_WITH_IMAGES)
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      limits: {
        files: 10,
        fields: 1,
        fileSize: MAX_IMAGE_FILE_SIZE_IN_BYTES,
      },
    }),
  )
  createWithImages(
    @Body() createMessageDto: CreateMessageDto,
    @Param('roomID', new ParseMongoIdPipe()) roomID: string,
    @UserID() userID: string,
    @UploadedFiles(
      new ImagesSizeValidationPipe(),
      new ImagesFormatValidationPipe(),
    )
    images: Array<Express.Multer.File>,
  ) {
    return this.messagesService.createWithImages(
      roomID,
      userID,
      createMessageDto,
      images,
    );
  }

  @Post(ROUTES.MESSAGES.CREATE_WITH_VIDEOS)
  @UseInterceptors(
    FilesInterceptor('videos', 10, {
      limits: {
        files: 10,
        fields: 1,
        fileSize: MAX_VIDEO_FILE_SIZE_IN_BYTES,
      },
    }),
  )
  createWithVideos(
    @Body() createMessageDto: CreateMessageDto,
    @Param('roomID', new ParseMongoIdPipe()) roomID: string,
    @UserID() userID: string,
    @UploadedFiles(
      new VideosSizeValidationPipe(),
      new VideosFormatValidationPipe(),
    )
    videos: Array<Express.Multer.File>,
  ) {
    return this.messagesService.createWithVideos(
      roomID,
      userID,
      createMessageDto,
      videos,
    );
  }

  @Post(ROUTES.MESSAGES.CREATE_WITH_VOICE)
  @UseInterceptors(
    FileInterceptor('voice', {
      limits: {
        files: 1,
        fields: 2,
        fileSize: MAX_VOICE_FILE_SIZE_IN_BYTES,
      },
    }),
  )
  createWithVoice(
    @Body() createMessageDto: CreateMessageDto,
    @Param('roomID', new ParseMongoIdPipe()) roomID: string,
    @UserID() userID: string,
    @UploadedFile(
      new VoiceSizeValidationPipe(),
      new VoiceFormatValidationPipe(),
    )
    voice?: Express.Multer.File,
  ) {
    return this.messagesService.createWithVoice(
      roomID,
      userID,
      createMessageDto,
      voice,
    );
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}
