import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { ApiResponse } from '@nestjs/swagger/dist/decorators';
import { Public } from 'core/decorators/public.decorator';
import { Roles } from 'core/decorators/roles.decorator';
import { UserID } from 'core/decorators/user-id.decorator';
import { CreateCustomerDto } from 'modules/system-users/customers/dto/create-customer.dto';
import { CreateStoreOwnerDto } from 'modules/system-users/store-owners/dto/create-store-owner.dto';
import { ROUTES } from 'shared/constants/routes.constant';
import { Role } from 'shared/enums/role.enum';
import { registerRouteApiResponse } from './constants/register-route-api-response.constant';
import { LogUserInDto } from './dto/log-user-in.dto';
import { LoginService } from './login.service';
import { LogoutService } from './logout.service';
import { RegisterService } from './register.service';

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
  @Post(ROUTES.AUTH.LOG_USER_IN)
  logUserIn(@Body() logUserInDto: LogUserInDto) {
    return this.loginService.logUserIn(logUserInDto);
  }

  @Post(ROUTES.AUTH.LOG_OUT)
  logUserOut(@UserID() userID: string) {
    return this.logoutService.logUserOut(userID);
  }

  @Roles([Role.ADMIN])
  @Post(ROUTES.AUTH.REGISTER_STORE_OWNER)
  registerStoreOwner(@Body() createStoreOwnerDto: CreateStoreOwnerDto) {
    return this.registerService.registerStoreOwner(createStoreOwnerDto);
  }
}
