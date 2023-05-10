import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from 'src/common/guards';
import { CreateReservationDto } from './dto/check-in-reservation.dto';

@ApiTags('Table')
@UseGuards(JwtGuard)
@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '登記候位' })
  @Post()
  async createReservation(
    @Request() request,
    @Body() dto: CreateReservationDto,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
    console.log(dto);
    const decodedToken = this.jwtService.verify(token);
    console.log(decodedToken);
    console.log('checkInReservation');
    await this.reservationService.createReservation(dto, decodedToken.id);

    // 取得候位資訊
    const documents = await this.reservationService.getReservationWaitList();
    const reservation_list = documents.map((doc) => {
      const reservation = doc.toJSON();
      return {
        id: reservation._id,
        name: reservation.name,
        customer_num: reservation.customer_num,
        create_time: reservation.create_time,
        status: reservation.status,
      };
    });

    return { reservation_list };
  }
}
