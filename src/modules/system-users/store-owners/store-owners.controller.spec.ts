import { Test, TestingModule } from '@nestjs/testing';
import { StoreOwnersController } from './store-owners.controller';
import { StoreOwnersService } from './store-owners.service';

describe('StoreOwnersController', () => {
  let controller: StoreOwnersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreOwnersController],
      providers: [StoreOwnersService],
    }).compile();

    controller = module.get<StoreOwnersController>(StoreOwnersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
