import { Test, TestingModule } from '@nestjs/testing';
import { ManageProductController } from './manage-product.controller';

describe('ManageProductController', () => {
  let controller: ManageProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageProductController],
    }).compile();

    controller = module.get<ManageProductController>(ManageProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
