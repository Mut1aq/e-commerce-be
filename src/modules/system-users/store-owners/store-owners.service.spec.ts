import { Test, TestingModule } from '@nestjs/testing';
import { StoreOwnersService } from './store-owners.service';

describe('StoreOwnersService', () => {
  let service: StoreOwnersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreOwnersService],
    }).compile();

    service = module.get<StoreOwnersService>(StoreOwnersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
