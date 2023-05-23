import { Test, TestingModule } from '@nestjs/testing';
import { OrderSocketGateway } from './order-socket.gateway';

describe('OrderSocketGateway', () => {
  let gateway: OrderSocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderSocketGateway],
    }).compile();

    gateway = module.get<OrderSocketGateway>(OrderSocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
