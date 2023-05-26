import { Module } from '@nestjs/common';
import { OrderSocketGateway } from './order-socket.gateway';
import { OrderDetailModule } from '../order-detail';

@Module({
  imports: [OrderDetailModule],
  providers: [OrderSocketGateway],
})
export class OrderSocketModule {}
