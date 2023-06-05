import { Test, TestingModule } from '@nestjs/testing';
import { CheckOutService } from './check-out.service';

describe('CheckOutService', () => {
  let service: CheckOutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckOutService],
    }).compile();

    service = module.get<CheckOutService>(CheckOutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
