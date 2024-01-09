import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { Role } from 'shared/enums/role.enum';
import { User } from '../users/entities/user.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(SCHEMAS.USER) private readonly customerModel: Model<User>,
  ) {}
  createCustomerForAuth(createCustomerDto: CreateCustomerDto) {
    const { email, password, ...restOfCreateCustomerDto } = createCustomerDto;

    const createdCustomer = new this.customerModel({
      email,
      password,
      role: Role.CUSTOMER,
    });
    createdCustomer.customerProperties = restOfCreateCustomerDto;

    return createdCustomer.save();
  }

  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, _updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
