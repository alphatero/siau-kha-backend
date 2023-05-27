import { Test, TestingModule } from '@nestjs/testing';
import { FoodItemsController } from './food-items.controller';

describe('FoodItemsController', () => {
  let controller: FoodItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodItemsController],
    }).compile();

    controller = module.get<FoodItemsController>(FoodItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
