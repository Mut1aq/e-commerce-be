import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoreEmployeesService } from './store-employees.service';
import { UpdateStoreEmployeeDto } from './dto/update-store-employee.dto';

@Controller('store-employees')
export class StoreEmployeesController {
  constructor(private readonly storeEmployeesService: StoreEmployeesService) {}

  @Get()
  findAll() {
    return this.storeEmployeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeEmployeesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoreEmployeeDto: UpdateStoreEmployeeDto,
  ) {
    return this.storeEmployeesService.update(+id, updateStoreEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeEmployeesService.remove(+id);
  }
}
