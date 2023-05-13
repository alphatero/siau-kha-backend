import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
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
      example: {
        status: 'success',
        message: '成功',
      },
    },
  })
  @Post()
  async createReservation(
    @Request() request,
    @Body() dto: CreateReservationDto,
  ) {
    const { user } = request;
    // 寫入候位資訊
    await this.reservationService.createReservation(dto, user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '取得所有候位中的清單' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: 'success',
        message: '成功',
        data: {
          reservation_list: [
            {
              id: '645b579334c423887ff962ea',
              name: '陳先生',
              customer_num: 3,
              create_time: '2023-05-10T08:36:35.509Z',
              status: 'WAIT',
            },
          ],
        },
      },
    },
  })
  @Get()
  async getReservation() {
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

  @ApiBearerAuth()
  @ApiOperation({ summary: '安排入座' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: 'success',
        message: '成功',
      },
    },
  })
  @Patch('/:id')
  async arrangeSetting(@Param('id') id: string) {
    // 安排入座
    await this.reservationService.changeReservationStatus(id, 'SUCCESS');
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '取消候位' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: 'success',
        message: '成功',
      },
    },
  })
  @Delete('/:id')
  async deleteReservation(@Param('id') id: string) {
    // 取消候位
    await this.reservationService.changeReservationStatus(id, 'DELETE');
  }
}
