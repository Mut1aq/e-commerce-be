import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileUploadService } from 'core/lib/file-upload/file-upload.service';
import { UsersService } from 'modules/system-users/users/users.service';
import { Model } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { RoomsService } from '../rooms/rooms.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(SCHEMAS.MESSAGE) private readonly messageModel: Model<Message>,
    private readonly usersService: UsersService,
    private readonly roomsService: RoomsService,
    private readonly fileUploadService: FileUploadService,
  ) {}
  async create(
    roomID: string,
    userID: string,
    createMessageDto: CreateMessageDto,
  ) {
    const [user, room] = await Promise.all([
      this.usersService.findByID(userID),
      this.roomsService.findByIDAndChatParticipant(roomID, userID),
    ]);

    if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    if (!room) throw new HttpException('Room Not Found', HttpStatus.NOT_FOUND);

    const messageToCreate = new this.messageModel(createMessageDto);
    messageToCreate.sender = user;
    messageToCreate.receiver =
      room.customer.id === userID ? room.employee : room.customer;
    messageToCreate.room = room;

    await messageToCreate.save();

    return {
      data: messageToCreate,
      message: {
        translationKey: 'shared.success.create',
        args: { entity: 'entities.message' },
      },
      httpStatus: HttpStatus.CREATED,
    };
  }

  async createWithDocuments(
    roomID: string,
    userID: string,
    createMessageDto: CreateMessageDto,
    documents: Express.Multer.File[],
  ) {
    const [user, room] = await Promise.all([
      this.usersService.findByID(userID),
      this.roomsService.findByIDAndChatParticipant(roomID, userID),
    ]);

    if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    if (!room) throw new HttpException('Room Not Found', HttpStatus.NOT_FOUND);

    const messageToCreate = new this.messageModel(createMessageDto);
    messageToCreate.sender = user;
    messageToCreate.receiver =
      room.customer.id === userID ? room.employee : room.customer;
    messageToCreate.room = room;

    if (!documents)
      throw new HttpException(
        'Must send files to send message',
        HttpStatus.BAD_REQUEST,
      );
    const uploadedMediaObjects =
      await this.fileUploadService.uploadDocumentsForMessage(
        documents!,
        roomID,
      );

    messageToCreate.documents = uploadedMediaObjects;

    await messageToCreate.save();

    return {
      data: messageToCreate,
      message: {
        translationKey: 'shared.success.create',
        args: { entity: 'entities.message' },
      },
      httpStatus: HttpStatus.CREATED,
    };
  }

  async createWithImages(
    roomID: string,
    userID: string,
    createMessageDto: CreateMessageDto,
    images: Express.Multer.File[],
  ) {
    const [user, room] = await Promise.all([
      this.usersService.findByID(userID),
      this.roomsService.findByIDAndChatParticipant(roomID, userID),
    ]);

    if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    if (!room) throw new HttpException('Room Not Found', HttpStatus.NOT_FOUND);

    const messageToCreate = new this.messageModel(createMessageDto);
    messageToCreate.sender = user;
    messageToCreate.receiver =
      room.customer.id === userID ? room.employee : room.customer;
    messageToCreate.room = room;

    if (!images)
      throw new HttpException(
        'Must send files to send message',
        HttpStatus.BAD_REQUEST,
      );

    const uploadedMediaObjects =
      await this.fileUploadService.uploadImagesForMessage(images, roomID);
    messageToCreate.images = uploadedMediaObjects;

    await messageToCreate.save();

    return {
      data: messageToCreate,
      message: {
        translationKey: 'shared.success.create',
        args: { entity: 'entities.message' },
      },
      httpStatus: HttpStatus.CREATED,
    };
  }

  async createWithVideos(
    roomID: string,
    userID: string,
    createMessageDto: CreateMessageDto,
    videos: Express.Multer.File[],
  ) {
    const [user, room] = await Promise.all([
      this.usersService.findByID(userID),
      this.roomsService.findByIDAndChatParticipant(roomID, userID),
    ]);

    if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    if (!room) throw new HttpException('Room Not Found', HttpStatus.NOT_FOUND);

    const messageToCreate = new this.messageModel(createMessageDto);
    messageToCreate.sender = user;
    messageToCreate.receiver =
      room.customer.id === userID ? room.employee : room.customer;
    messageToCreate.room = room;

    if (!videos)
      throw new HttpException(
        'Must send files to send message',
        HttpStatus.BAD_REQUEST,
      );

    const uploadedMediaObjects =
      await this.fileUploadService.uploadVideosForMessage(videos, roomID);
    messageToCreate.videos = uploadedMediaObjects;

    await messageToCreate.save();

    return {
      data: messageToCreate,
      message: {
        translationKey: 'shared.success.create',
        args: { entity: 'entities.message' },
      },
      httpStatus: HttpStatus.CREATED,
    };
  }

  async createWithVoice(
    roomID: string,
    userID: string,
    createMessageDto: CreateMessageDto,
    voice: Express.Multer.File,
  ) {
    const [user, room] = await Promise.all([
      this.usersService.findByID(userID),
      this.roomsService.findByIDAndChatParticipant(roomID, userID),
    ]);

    if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    if (!room) throw new HttpException('Room Not Found', HttpStatus.NOT_FOUND);

    const messageToCreate = new this.messageModel(createMessageDto);
    messageToCreate.sender = user;
    messageToCreate.receiver =
      room.customer.id === userID ? room.employee : room.customer;
    messageToCreate.room = room;

    if (!voice)
      throw new HttpException(
        'Must send files to send message',
        HttpStatus.BAD_REQUEST,
      );

    const uploadedMediaObject =
      await this.fileUploadService.uploadVoiceForMessage(voice, roomID);
    messageToCreate.voice = uploadedMediaObject;

    await messageToCreate.save();

    return {
      data: messageToCreate,
      message: {
        translationKey: 'shared.success.create',
        args: { entity: 'entities.message' },
      },
      httpStatus: HttpStatus.CREATED,
    };
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, _updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
