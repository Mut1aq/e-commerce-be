import { Test, TestingModule } from '@nestjs/testing';
import { StoreEmployeesController } from './store-employees.controller';
import { StoreEmployeesService } from './store-employees.service';

describe('StoreEmployeesController', () => {
  let controller: StoreEmployeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreEmployeesController],
      providers: [StoreEmployeesService],
    }).compile();

    controller = module.get<StoreEmployeesController>(StoreEmployeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
