import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CountriesModule } from './countries/countries.module';
import { CategoriesModule } from './store-details/categories/categories.module';
import { ProductsModule } from './store-details/products/products.module';
import { StoreModule } from './store-details/store/store.module';
import { AdminsModule } from './system-users/admins/admins.module';
import { CustomersModule } from './system-users/customers/customers.module';
import { StoreOwnersModule } from './system-users/store-owners/store-owners.module';
import { UsersModule } from './system-users/users/users.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    StoreModule,
    CountriesModule,
    AdminsModule,
    CustomersModule,
    StoreOwnersModule,
    CategoriesModule,
    ProductsModule,
  ],
})
export class ModulesModule {}
