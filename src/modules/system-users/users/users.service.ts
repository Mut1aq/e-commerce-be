import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { FileUploadService } from 'core/lib/file-upload/file-upload.service';
import { Model } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { checkObjectNullability } from 'shared/util/nullability.util';
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
    userID: string,
    updateProfileDto: UpdateProfileDto,
    profilePicture?: Express.Multer.File,
  ) {
    const { email } = updateProfileDto;
    const user = await this.findByID(userID);
    if (!user)
      throw new HttpException(
        'User was not found can not make an update',
        HttpStatus.NOT_FOUND,
      );
    !email ? null : (user.email = email);

    const shouldAddProfilePictureToUserWithNoProfilePicture =
      !checkObjectNullability(user.profilePicture) &&
      checkObjectNullability(profilePicture);
    const shouldDeleteProfilePictureAndAddNewProfilePicture =
      checkObjectNullability(user.profilePicture) &&
      checkObjectNullability(profilePicture);

    const shouldDeleteProfilePicture =
      updateProfileDto.shouldDeleteProfilePicture &&
      checkObjectNullability(user.profilePicture);

    if (shouldAddProfilePictureToUserWithNoProfilePicture) {
      const profilePictureMediaObject =
        await this.fileUploadService.uploadProfilePictureForUser(
          profilePicture!,
          user.id,
        );

      user.profilePicture = profilePictureMediaObject;
    } else if (shouldDeleteProfilePictureAndAddNewProfilePicture) {
      const [profilePictureMediaObject, _] = await Promise.all([
        this.fileUploadService.uploadProfilePictureForUser(
          profilePicture!,
          user.id,
        ),
        this.fileUploadService.deleteResource(user.profilePicture!.solutionID),
      ]);

      user.profilePicture = profilePictureMediaObject;
    } else if (shouldDeleteProfilePicture) {
      await this.fileUploadService.deleteResource(
        user.profilePicture!.solutionID,
      );

      user.profilePicture = undefined;
    }
    await user.save();

    return {
      httpStatus: HttpStatus.CREATED,
      message: {
        translationKey: 'shared.success.update',
        args: { entity: 'entities.user' },
      },
      data: user,
    };
  }
}
