import { AddProductMiddleware } from './add-product.middleware';

describe('AddProductMiddleware', () => {
  it('should be defined', () => {
    expect(new AddProductMiddleware()).toBeDefined();
  });
});
