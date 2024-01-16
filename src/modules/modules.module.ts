import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chats/chat/chat.module';
import { MessagesModule } from './chats/messages/messages.module';
import { RoomsModule } from './chats/rooms/rooms.module';
import { CountriesModule } from './countries/countries.module';
import { CategoriesModule } from './store-details/categories/categories.module';
import { ProductsModule } from './store-details/products/products.module';
import { StoresModule } from './store-details/stores/stores.module';
import { VariantsModule } from './store-details/variants/variants.module';
import { AdminsModule } from './system-users/admins/admins.module';
import { CustomersModule } from './system-users/customers/customers.module';
import { StoreOwnersModule } from './system-users/store-owners/store-owners.module';
import { UsersModule } from './system-users/users/users.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    StoresModule,
    CountriesModule,
    AdminsModule,
    CustomersModule,
    StoreOwnersModule,
    CategoriesModule,
    ProductsModule,
    VariantsModule,
    ChatModule,
    RoomsModule,
    MessagesModule,
  ],
})
export class ModulesModule {}
