import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards';
import { ActivitiesService } from './activities.service';
import { getActivityExample } from './apiExample';
import { CreateActivityDto } from './dto/create-activity.dto';
@ApiTags('activities')
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
    const documents = await this.activitiesService.getActivitiesList();
    const activities = documents.map((doc) => {
      const activity = doc.toJSON();
      return {
        id: activity._id,
        activities_name: activity.activities_name,
        discount_type: activity.discount_type,
        min_spend: activity.min_spend,
        is_period: activity.is_period,
        start_time: activity.start_time,
        end_time: activity.end_time,
        act_products_list: activity.act_products_list,
      };
    });
    return { activities };
  }

  @ApiExcludeEndpoint()
  @ApiBearerAuth()
  @Post()
  async createActivity(@Body() dto: CreateActivityDto) {
    return await this.activitiesService.createActivity(dto);
  }
}
