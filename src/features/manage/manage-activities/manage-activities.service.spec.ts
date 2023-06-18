import { Test, TestingModule } from '@nestjs/testing';
import { ManageActivitiesService } from './manage-activities.service';

describe('ManageActivitiesService', () => {
  let service: ManageActivitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageActivitiesService],
    }).compile();

    service = module.get<ManageActivitiesService>(ManageActivitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
