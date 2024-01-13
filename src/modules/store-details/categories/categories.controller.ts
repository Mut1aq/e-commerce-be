import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permissions } from 'core/decorators/permissions.decorator';
import { Roles } from 'core/decorators/roles.decorator';
import { UserID } from 'core/decorators/user-id.decorator';
import { ROUTES } from 'shared/constants/routes.constant';
import { Role } from 'shared/enums/role.enum';
import { CategoriesService } from './categories.service';
import { createCategory } from './constants/permissions.constant';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags(ROUTES.CATEGORIES.CONTROLLER)
@Controller(ROUTES.CATEGORIES.CONTROLLER)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Permissions(createCategory)
  @Roles([Role.STORE_EMPLOYEE, Role.STORE_OWNER])
  @Post(ROUTES.CATEGORIES.CREATE)
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UserID() storeOwnerID: string,
    @Param('storeID') storeID: string,
  ) {
    return this.categoriesService.create(
      createCategoryDto,
      storeOwnerID,
      storeID,
    );
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
