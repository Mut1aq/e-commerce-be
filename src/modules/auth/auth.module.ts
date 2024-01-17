import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginService } from './login.service';
import { RegisterService } from './register.service';
import { PasswordService } from './password.service';
import { LogoutService } from './logout.service';
import { UsersModule } from 'modules/system-users/users/users.module';
import { CustomersModule } from 'modules/system-users/customers/customers.module';
import { AdminsModule } from 'modules/system-users/admins/admins.module';
import { StoreOwnersModule } from 'modules/system-users/store-owners/store-owners.module';
import { StoreEmployeesModule } from 'modules/system-users/store-employees/store-employees.module';
import { CacheModule } from 'core/lib/cache/cache.module';
import { RefreshService } from './refresh.service';

@Module({
  controllers: [AuthController],
  providers: [LoginService, RegisterService, PasswordService, LogoutService, RefreshService],
  imports: [
    CacheModule,
    UsersModule,
    CustomersModule,
    AdminsModule,
    StoreOwnersModule,
    StoreEmployeesModule,
  ],
})
export class AuthModule {}
