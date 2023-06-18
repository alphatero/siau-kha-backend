import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { JwtGuard } from 'src/common/guards';
import { CreateReservationDto } from './dto/check-in-reservation.dto';
import { ReservationStatus } from 'src/core/models/reservation';
import { getReservationWaitListExample } from './apiExample';
import { basicExample } from 'src/common/utils/apiExample';

@ApiTags('Reservation')
@UseGuards(JwtGuard)
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '登記候位' })
  @ApiResponse({
    status: 200,
    schema: {
      example: basicExample,
    },
  })
  @Post()
  async createReservation(@Req() request, @Body() dto: CreateReservationDto) {
    const { user } = request;
    // 寫入候位資訊
    await this.reservationService.createReservation(dto, user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '取得所有候位中的清單' })
  @ApiResponse({
    status: 200,
    schema: {
      example: getReservationWaitListExample,
    },
  })
  @Get()
  async getReservation() {
    // 取得候位資訊
    return await this.reservationService.getReservationWaitList();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '安排入座' })
  @ApiResponse({
    status: 200,
    schema: {
      example: basicExample,
    },
  })
  @Patch('/:id/:table_id/:customer_num')
  async arrangeSeating(
    @Req() request,
    @Param('id') id: string,
    @Param('table_id') tableId: string,
    @Param('customer_num') customerNum: number,
  ) {
    const { user } = request;
    await this.reservationService.changeReservationStatus(
      id,
      ReservationStatus.SUCCESS,
      user,
      tableId,
      customerNum,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '取消候位' })
  @ApiResponse({
    status: 200,
    schema: {
      example: basicExample,
    },
  })
  @Delete('/:id')
  async deleteReservation(@Param('id') id: string) {
    // 取消候位
    await this.reservationService.changeReservationStatus(
      id,
      ReservationStatus.CANCEL,
    );
  }
}
