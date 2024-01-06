import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AdminsService } from 'modules/system-users/admins/admins.service';
import { CreateAdminDto } from 'modules/system-users/admins/dto/create-admin.dto';
import { CustomersService } from 'modules/system-users/customers/customers.service';
import { CreateCustomerDto } from 'modules/system-users/customers/dto/create-customer.dto';
import { CreateStoreOwnerDto } from 'modules/system-users/store-owners/dto/create-store-owner.dto';
import { UserDocument } from 'modules/system-users/users/types/user-document.type';
import { ResponseFromServiceI } from 'shared/interfaces/general/response-from-service.interface';
import { generate } from 'generate-password';
import { StoreOwnersService } from 'modules/system-users/store-owners/store-owners.service';

@Injectable()
export class RegisterService {
  constructor(
    private readonly customersService: CustomersService,
    private readonly adminsService: AdminsService,
    private readonly storeOwnersService: StoreOwnersService,
  ) {}
  async registerCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<ResponseFromServiceI<UserDocument>> {
    const { password } = createCustomerDto;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    createCustomerDto.password = hashedPassword;

    const createdUser =
      await this.customersService.createCustomerForAuth(createCustomerDto);

    return {
      httpStatus: HttpStatus.CREATED,
      message: {
        translationKey: 'shared.success.create',
        args: { entity: 'entities.user' },
      },
      data: createdUser,
    };
  }

  async registerAdmin(createAdminDto: CreateAdminDto) {
    const { password } = createAdminDto;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    createAdminDto.password = hashedPassword;

    const createdAdmin =
      await this.adminsService.createAdminForAuth(createAdminDto);

    return {
      httpStatus: HttpStatus.CREATED,
      message: {
        translationKey: 'shared.success.create',
        args: { entity: 'entities.user' },
      },
      data: createdAdmin,
    };
  }

  async registerStoreOwner(createStoreOwnerDto: CreateStoreOwnerDto) {
    const password = generate({
      length: 10,
      numbers: true,
      uppercase: true,
      lowercase: true,
      symbols: true,
      strict: true,
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    (
      createStoreOwnerDto as CreateStoreOwnerDto & { password: string }
    ).password = hashedPassword;

    const createdStoreOwner =
      await this.storeOwnersService.createStoreOwnerForAuth(
        createStoreOwnerDto,
      );

    return {
      httpStatus: HttpStatus.CREATED,
      message: {
        translationKey: 'shared.success.create',
        args: { entity: 'entities.user' },
      },
      data: createdStoreOwner,
    };
  }
}
