import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SCHEMAS } from 'shared/constants/schemas.constant';
import { Action } from 'shared/enums/action.enum';
import { Role } from 'shared/enums/role.enum';
import { User } from '../users/entities/user.entity';
import { UserDocument } from '../users/types/user-document.type';
import { CreateStoreEmployeeDto } from './dto/create-store-employee.dto';
import { UpdateStoreEmployeeDto } from './dto/update-store-employee.dto';

@Injectable()
export class StoreEmployeesService {
  constructor(
    @InjectModel(SCHEMAS.USER) private readonly storeEmployeeModel: Model<User>,
  ) {}
  async createStoreEmployeeForAuth(
    createStoreEmployeeDto: CreateStoreEmployeeDto,
    creatorID: string,
  ) {
    const { email, password, ...restOfCreateStoreEmployeeDto } =
      createStoreEmployeeDto as CreateStoreEmployeeDto & {
        password: string;
      };

    const creator = await this.storeEmployeeModel
      .findOne<UserDocument>({
        $and: [
          {
            $or: [
              {
                $and: [
                  {
                    'storeEmployeeProperties.permission.employee': {
                      $in: [Action.CREATE, Action.MANAGE],
                    },
                  },
                  {
                    role: Role.STORE_EMPLOYEE,
                  },
                ],
              },

              {
                role: Role.STORE_OWNER,
              },
            ],
          },
          {
            _id: new Types.ObjectId(creatorID),
          },
        ],
      })
      .exec();

    if (!creator)
      throw new HttpException(
        'who are you trying to hack?',
        HttpStatus.UNAUTHORIZED,
      );

    const createdStoreEmployee = new this.storeEmployeeModel({
      email,
      password,
    });
    createdStoreEmployee.role = Role.STORE_EMPLOYEE;
    createdStoreEmployee.storeEmployeeProperties = {
      ...restOfCreateStoreEmployeeDto,
      firedEmployees: [],
      author: creator!,
    };

    return createdStoreEmployee.save();
  }

  findAll() {
    return `This action returns all storeEmployees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storeEmployee`;
  }

  update(id: number, _updateStoreEmployeeDto: UpdateStoreEmployeeDto) {
    return `This action updates a #${id} storeEmployee`;
  }

  remove(id: number) {
    return `This action removes a #${id} storeEmployee`;
  }
}
