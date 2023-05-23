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
import { JwtGuard } from 'src/common/guards';
import { basicExample } from 'src/common/utils/apiExample';
import { getTagsExample } from './apiExample';
import { CreateTagDto } from './dto';
import { ManageProductService } from './manage-product.service';

@ApiTags('Manage-Product')
@UseGuards(JwtGuard)
@Controller('manage/product')
export class ManageProductController {
  constructor(private readonly manageProductService: ManageProductService) {}

  @ApiOperation({ summary: '管理端-取得所有商品類別' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    schema: {
      example: getTagsExample,
    },
  })
  @Get('get-all-tags')
  async getProductTags() {
    return await this.manageProductService.getProductTags();
  }

  @ApiOperation({ summary: '管理端-新增商品類別' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    schema: {
      example: basicExample,
    },
  })
  @Post('add-tag')
  async createProductTag(@Req() request, @Body() dto: CreateTagDto) {
    const { user } = request;
    return await this.manageProductService.createProductTag(dto, user);
  }

  @ApiOperation({ summary: '管理端-編輯商品類別' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    schema: {
      example: basicExample,
    },
  })
  @Patch('edit-tag/:id')
  async editProductTag(
    @Req() request,
    @Param('id') id: string,
    @Body() dto: CreateTagDto,
  ) {
    const { user } = request;
    return await this.manageProductService.editProductTag(dto, id, user);
  }

  @ApiOperation({ summary: '管理端-刪除商品類別' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    schema: {
      example: basicExample,
    },
  })
  @Delete('edit-tag/:id')
  async delProductTag(@Req() request, @Param('id') id: string) {
    const { user } = request;
    return await this.manageProductService.delProductTag(id, user);
  }
}
