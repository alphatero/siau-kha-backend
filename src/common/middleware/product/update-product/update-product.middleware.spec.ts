import { UpdateProductMiddleware } from './update-product.middleware';

describe('UpdateProductMiddleware', () => {
  it('should be defined', () => {
    expect(new UpdateProductMiddleware()).toBeDefined();
  });
});
