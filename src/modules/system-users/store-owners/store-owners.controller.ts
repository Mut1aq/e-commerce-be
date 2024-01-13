import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoreOwnersService } from './store-owners.service';
import { UpdateStoreOwnerDto } from './dto/update-store-owner.dto';

@Controller('store-owners')
export class StoreOwnersController {
  constructor(private readonly storeOwnersService: StoreOwnersService) {}

  @Get()
  findAll() {
    return this.storeOwnersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeOwnersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoreOwnerDto: UpdateStoreOwnerDto,
  ) {
    return this.storeOwnersService.update(+id, updateStoreOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeOwnersService.remove(+id);
  }
}
