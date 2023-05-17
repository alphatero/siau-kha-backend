import { ActivitiesMiddleware } from './activities.middleware';

describe('ActivitiesMiddleware', () => {
  it('should be defined', () => {
    expect(new ActivitiesMiddleware()).toBeDefined();
  });
});
