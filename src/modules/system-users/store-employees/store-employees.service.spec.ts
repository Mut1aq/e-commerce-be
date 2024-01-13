import { Test, TestingModule } from '@nestjs/testing';
import { StoreEmployeesService } from './store-employees.service';

describe('StoreEmployeesService', () => {
  let service: StoreEmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreEmployeesService],
    }).compile();

    service = module.get<StoreEmployeesService>(StoreEmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
