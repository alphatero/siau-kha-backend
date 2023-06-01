import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards';
import { Role } from 'src/core/models/user';
import { ActivitiesService } from './activities.service';
import { getActivityExample } from './apiExample';
import { CreateActivityDto } from './dto/create-activity.dto';
@ApiTags('Activities')
@UseGuards(JwtGuard)
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '取得所有活動' })
  @ApiResponse({
    status: 200,
    schema: {
      example: getActivityExample,
    },
  })
  @Get('/list')
  async getActivity() {
    return await this.activitiesService.getActivitiesList(Role.WAITER);
  }

  @ApiExcludeEndpoint()
  @ApiBearerAuth()
  @Post()
  async createActivity(@Body() dto: CreateActivityDto) {
    return await this.activitiesService.createActivity(dto);
  }
}
