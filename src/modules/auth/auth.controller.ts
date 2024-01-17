import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { ApiResponse } from '@nestjs/swagger/dist/decorators';
import { SkipThrottle } from '@nestjs/throttler/dist/throttler.decorator';
import { Public } from 'core/decorators/public.decorator';
import { Roles } from 'core/decorators/roles.decorator';
import { UserID } from 'core/decorators/user-id.decorator';
import { CreateCustomerDto } from 'modules/system-users/customers/dto/create-customer.dto';
import { CreateStoreEmployeeDto } from 'modules/system-users/store-employees/dto/create-store-employee.dto';
import { CreateStoreOwnerDto } from 'modules/system-users/store-owners/dto/create-store-owner.dto';
import { ROUTES } from 'shared/constants/routes.constant';
import { Role } from 'shared/enums/role.enum';
import { registerRouteApiResponse } from './constants/register-route-api-response.constant';
import { LogUserInDto } from './dto/log-user-in.dto';
import { LoginService } from './login.service';
import { LogoutService } from './logout.service';
import { RegisterService } from './register.service';
import { Response } from 'express';

@SkipThrottle()
@ApiTags(ROUTES.AUTH.CONTROLLER)
@Controller(ROUTES.AUTH.CONTROLLER)
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
    private readonly logoutService: LogoutService,
  ) {}

  @Public()
  @ApiResponse(registerRouteApiResponse)
  @Post(ROUTES.AUTH.REGISTER_CUSTOMER)
  registerCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.registerService.registerCustomer(createCustomerDto);
  }

  @Public()
  @SkipThrottle({ default: false })
  @Post(ROUTES.AUTH.LOG_USER_IN)
  logUserIn(
    @Body() logUserInDto: LogUserInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.loginService.logUserIn(logUserInDto, response);
  }

  @Post(ROUTES.AUTH.LOG_OUT)
  logUserOut(
    @UserID() userID: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.logoutService.logUserOut(userID, response);
  }

  // @Public()
  // @Post(ROUTES.AUTH.REGISTER_ADMIN)
  // registerAdmin(@Body() createAdminDto: CreateAdminDto) {
  //   return this.registerService.registerAdmin(createAdminDto);
  // }

  @Roles([Role.ADMIN])
  @Post(ROUTES.AUTH.REGISTER_STORE_OWNER)
  registerStoreOwner(@Body() createStoreOwnerDto: CreateStoreOwnerDto) {
    return this.registerService.registerStoreOwner(createStoreOwnerDto);
  }

  @Roles([Role.STORE_OWNER, Role.STORE_EMPLOYEE])
  @Post(ROUTES.AUTH.REGISTER_STORE_EMPLOYEE)
  registerStoreEmployee(
    @Body() createStoreEmployeeDto: CreateStoreEmployeeDto,
    @UserID() creatorID: string,
  ) {
    return this.registerService.registerStoreEmployee(
      createStoreEmployeeDto,
      creatorID,
    );
  }
}
