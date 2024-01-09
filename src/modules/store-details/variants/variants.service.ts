import { Injectable } from '@nestjs/common';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Injectable()
export class VariantsService {
  create(_createVariantDto: CreateVariantDto) {
    return 'This action adds a new variant';
  }

  findAll() {
    return `This action returns all variants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variant`;
  }

  update(id: number, _updateVariantDto: UpdateVariantDto) {
    return `This action updates a #${id} variant`;
  }

  remove(id: number) {
    return `This action removes a #${id} variant`;
  }
}
