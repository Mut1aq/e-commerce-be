import {
  Body,
  Controller,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { UserID } from 'core/decorators/user-id.decorator';
import { ROUTES } from 'shared/constants/routes.constant';
import { MAX_IMAGE_FILE_SIZE_IN_BYTES } from 'shared/constants/validation-helpers.constant';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilePictureFormatValidationPipe } from './pipes/profile-picture-format-validation.pipe';
import { ProfilePictureSizeValidationPipe } from './pipes/profile-picture-size-validation.pipe';
import { UsersService } from './users.service';

@ApiTags(ROUTES.USERS.CONTROLLER)
@Controller(ROUTES.USERS.CONTROLLER)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch(ROUTES.USERS.UPDATE_PROFILE)
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      limits: {
        files: 1,
        fields: 2,
        fileSize: MAX_IMAGE_FILE_SIZE_IN_BYTES,
      },
    }),
  )
  updateProfile(
    @UserID() userID: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile(
      new ProfilePictureSizeValidationPipe(),
      new ProfilePictureFormatValidationPipe(),
    )
    profilePicture?: Express.Multer.File,
  ) {
    return this.usersService.updateProfile(
      userID,
      updateProfileDto,
      profilePicture,
    );
  }
}
