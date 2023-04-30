import { SignInMiddleware } from './signIn.middleware';

describe('SignInMiddleware', () => {
  it('should be defined', () => {
    expect(new SignInMiddleware()).toBeDefined();
  });
});
