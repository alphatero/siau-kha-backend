import { Body, Controller, Post } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
// import { JwtGuard } from 'src/common/guards';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
@ApiTags('activities')
// @UseGuards(JwtGuard)
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly ActivitiesService: ActivitiesService) {}

  @ApiExcludeEndpoint()
  //   @ApiBearerAuth()
  @Post()
  async createActivity(@Body() dto: CreateActivityDto) {
    return await this.ActivitiesService.createActivity(dto);
  }
}
