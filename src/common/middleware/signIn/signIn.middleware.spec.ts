import { SigninMiddleware } from './signIn.middleware';

describe('SigninMiddleware', () => {
  it('should be defined', () => {
    expect(new SigninMiddleware()).toBeDefined();
  });
});
