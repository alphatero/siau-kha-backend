import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ManageActivitiesService } from './manage-activities.service';
import { CreateManageActivityDto, UpdateManageActivityDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards';
import { getActivitiesExample } from './apiExample';
import { basicExample } from 'src/common/utils/apiExample';

@ApiTags('ManageActivities')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('manage')
export class ManageActivitiesController {
  constructor(
    private readonly manageActivitiesService: ManageActivitiesService,
  ) {}
  @ApiOperation({ summary: '取得所有活動' })
  @ApiResponse({
    status: 200,
    schema: {
      example: getActivitiesExample,
    },
  })
  @Get('/act-manage/acts')
  getActivitiesList() {
    return this.manageActivitiesService.getActivitiesList(true);
  }

  @ApiOperation({ summary: '新增活動' })
  @ApiResponse({
    status: 200,
    schema: {
      example: basicExample,
    },
  })
  @Post('/act-manage/act')
  async createActivities(@Body() dto: CreateManageActivityDto) {
    await this.manageActivitiesService.createActivities(dto);
  }

  @ApiOperation({ summary: '修改活動內容' })
  @ApiResponse({
    status: 200,
    schema: {
      example: basicExample,
    },
  })
  @Patch('/act-manage/act/:actId')
  async updateActivities(
    @Param('actId') actId: string,
    @Body() dto: UpdateManageActivityDto,
  ) {
    await this.manageActivitiesService.updateActivities(actId, dto);
  }

  @ApiOperation({ summary: '移除活動' })
  @ApiResponse({
    status: 200,
    schema: {
      example: basicExample,
    },
  })
  @Delete('/act-manage/act/:actId')
  async deleteActivities(@Param('actId') actId: string) {
    await this.manageActivitiesService.deleteActivities(actId);
  }
}
