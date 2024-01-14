import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileUploadService } from 'core/lib/file-upload/file-upload.service';
import { Model } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from './entities/user.entity';
import { UserDocument } from './types/user-document.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(SCHEMAS.USER) private readonly userModel: Model<User>,

    private readonly fileUploadService: FileUploadService,
  ) {}

  createUserForAuth(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);

    return createdUser.save();
  }

  findUserByEmail(credentials: string) {
    return this.userModel
      .findOne<UserDocument>({
        $or: [
          {
            email: credentials,
          },
          {
            'customerProperties.username': credentials,
          },
        ],
      })
      .exec();
  }

  findByID(userID: string) {
    return this.userModel.findById<UserDocument>(userID).exec();
  }

  async updateProfile(
    _userID: string,
    _updateProfileDto: UpdateProfileDto,
    _file: Express.Multer.File,
  ) {
    const profilePictureMediaObject =
      await this.fileUploadService.uploadProfilePicture(
        _file,
        '65a40fb98bde18472673fdef',
      );
    console.log(profilePictureMediaObject);
  }
}
