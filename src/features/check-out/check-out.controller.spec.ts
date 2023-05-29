import { Test, TestingModule } from '@nestjs/testing';
import { CheckOutController } from './check-out.controller';

describe('CheckOutController', () => {
  let controller: CheckOutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckOutController],
    }).compile();

    controller = module.get<CheckOutController>(CheckOutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
