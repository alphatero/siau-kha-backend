import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReservationService } from './reservation.service';

@ApiTags('Table')
// @UseGuards(JwtGuard)
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
  @ApiOperation({ summary: '登記候位' })
  @Post()
  async checkInReservation() {
    console.log('checkInReservation');
  }
}
