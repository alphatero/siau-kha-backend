import { Test, TestingModule } from '@nestjs/testing';
import { ManageActivitiesController } from './manage-activities.controller';

describe('ManageActivitiesController', () => {
  let controller: ManageActivitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageActivitiesController],
    }).compile();

    controller = module.get<ManageActivitiesController>(
      ManageActivitiesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
