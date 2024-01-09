import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Roles } from 'core/decorators/roles.decorator';
import { Role } from 'shared/enums/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { ROUTES } from 'shared/constants/routes.constant';
import { UserID } from 'core/decorators/user-id.decorator';

@ApiTags(ROUTES.STORES.CONTROLLER)
@Controller(ROUTES.STORES.CONTROLLER)
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Roles([Role.STORE_OWNER])
  @Post()
  create(
    @Body() createStoreDto: CreateStoreDto,
    @UserID() storeOwnerID: string,
  ) {
    return this.storesService.create(createStoreDto, storeOwnerID);
  }

  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.remove(+id);
  }
}
