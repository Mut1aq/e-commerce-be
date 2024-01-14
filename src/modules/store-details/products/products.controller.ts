import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { ROUTES } from 'shared/constants/routes.constant';
import { UserID } from 'core/decorators/user-id.decorator';
import { ParseMongoIdPipe } from 'core/pipes/parse-mongo-id.pipe';

@ApiTags(ROUTES.PRODUCTS.CONTROLLER)
@Controller(ROUTES.PRODUCTS.CONTROLLER)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post(ROUTES.PRODUCTS.CREATE)
  create(
    @Body() createProductDto: CreateProductDto,
    @Param('categoryID', new ParseMongoIdPipe()) categoryID: string,
    @UserID() storeOwnerID: string,
  ) {
    return this.productsService.create(
      createProductDto,
      categoryID,
      storeOwnerID,
    );
  }

  @Get(ROUTES.PRODUCTS.FIND_ALL)
  findAll() {
    return this.productsService.findAll();
  }

  @Get(ROUTES.PRODUCTS.FIND_ALL_FOR_CATEGORY)
  findAllForCategory() {
    return this.productsService.findAllForCategory();
  }

  @Get(ROUTES.PRODUCTS.FIND_ONE)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(ROUTES.PRODUCTS.UPDATE_ONE)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(ROUTES.PRODUCTS.DELETE_ONE)
  remove(
    @Param('productID') productID: string,
    @UserID() storeOwnerID: string,
  ) {
    return this.productsService.remove(productID, storeOwnerID);
  }
}
