import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
@ApiTags('activities')
@UseGuards(JwtGuard)
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly ActivitiesService: ActivitiesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '取得所有活動' })
  @Get('/list')
  async getActivity() {
    const documents = await this.ActivitiesService.getActivitiesList();
    const activities = documents.map((doc) => {
      const activity = doc.toJSON();
      return {
        activities_name: activity.activities_name,
        discount_type: activity.discount_type,
        min_spend: activity.min_spend,
        is_period: activity.is_period,
        start_time: activity.start_time,
        end_time: activity.end_time,
        act_products_list: [].concat(activity.act_products_list),
      };
    });
    return { activities };
  }

  @ApiExcludeEndpoint()
  @ApiBearerAuth()
  @Post()
  async createActivity(@Body() dto: CreateActivityDto) {
    return await this.ActivitiesService.createActivity(dto);
  }
}
