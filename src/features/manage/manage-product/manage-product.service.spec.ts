import { Test, TestingModule } from '@nestjs/testing';
import { ManageProductService } from './manage-product.service';

describe('ManageProductService', () => {
  let service: ManageProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageProductService],
    }).compile();

    service = module.get<ManageProductService>(ManageProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
