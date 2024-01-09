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
import { UserID } from 'core/decorators/user-id.decorator';
import { ROUTES } from 'shared/constants/routes.constant';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags(ROUTES.CATEGORIES.CONTROLLER)
@Controller(ROUTES.CATEGORIES.CONTROLLER)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

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
