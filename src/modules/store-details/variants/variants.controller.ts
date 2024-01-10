import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VariantsService } from './variants.service';
import { CreateVariantsDto } from './dto/create-variants.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { ApiTags } from '@nestjs/swagger';
import { ROUTES } from 'shared/constants/routes.constant';
import { UserID } from 'core/decorators/user-id.decorator';

@ApiTags(ROUTES.VARIANTS.CONTROLLER)
@Controller(ROUTES.VARIANTS.CONTROLLER)
export class VariantsController {
  constructor(private readonly variantsService: VariantsService) {}

  @Post(ROUTES.VARIANTS.CREATE)
  create(
    @Body() createVariantsDto: CreateVariantsDto,
    @UserID() storeOwnerID: string,
    @Param('productID') productID: string,
  ) {
    return this.variantsService.create(
      createVariantsDto,
      storeOwnerID,
      productID,
    );
  }

  @Get(ROUTES.VARIANTS.FIND_ALL)
  findAll() {
    return this.variantsService.findAll();
  }

  @Get(ROUTES.VARIANTS.FIND_ONE)
  findOne(@Param('id') id: string) {
    return this.variantsService.findOne(+id);
  }

  @Patch(ROUTES.VARIANTS.UPDATE_ONE)
  update(
    @Param('variantID') variantID: string,
    @Param('productID') productID: string,
    @Body() updateVariantDto: UpdateVariantDto,
    @UserID() storeOwnerID: string,
  ) {
    return this.variantsService.update(
      variantID,
      productID,
      updateVariantDto,
      storeOwnerID,
    );
  }

  @Delete(ROUTES.VARIANTS.DELETE_ONE)
  remove(@Param('id') id: string) {
    return this.variantsService.remove(+id);
  }
}
