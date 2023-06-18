import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards';
import { getFoodItemsExample } from './apiExample';
import { FoodItemsService } from './food-items.service';
@ApiTags('FoodItems')
@UseGuards(JwtGuard)
@Controller('food-items')
export class FoodItemsController {
  constructor(private readonly foodItemsService: FoodItemsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '取得食材清單' })
  @ApiResponse({
    status: 200,
    schema: {
      example: getFoodItemsExample,
    },
  })
  @Get()
  async getActivity() {
    return await this.foodItemsService.getFoodItemsList();
  }
}
