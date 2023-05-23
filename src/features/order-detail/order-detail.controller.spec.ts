import { Test, TestingModule } from '@nestjs/testing';
import { OrderDetailController } from './order-detail.controller';

describe('OrderDetailController', () => {
  let controller: OrderDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderDetailController],
    }).compile();

    controller = module.get<OrderDetailController>(OrderDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
