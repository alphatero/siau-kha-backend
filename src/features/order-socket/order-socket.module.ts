import { Module } from '@nestjs/common';
import { OrderSocketGateway } from './order-socket.gateway';

@Module({
  providers: [OrderSocketGateway],
})
export class OrderSocketModule {}
