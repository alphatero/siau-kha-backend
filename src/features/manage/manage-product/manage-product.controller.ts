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
import { AddTagDto, AddProductDto } from './dto';
import { ManageProductService } from './manage-product.service';

@ApiTags('ManageProduct')
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
  async createProductTag(@Req() request, @Body() dto: AddTagDto) {
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
  @Patch('edit-tag/:t_id')
  async editProductTag(
    @Req() request,
    @Param('t_id') id: string,
    @Body() dto: AddTagDto,
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
  @Delete('close-tag/:t_id')
  async closeProductTag(@Req() request, @Param('t_id') id: string) {
    const { user } = request;
    return await this.manageProductService.closeProductTag(id, user);
  }

  @ApiOperation({ summary: '管理端-新增商品' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    schema: {
      example: basicExample,
    },
  })
  @Post('add-product')
  async addProduct(@Req() request, @Body() dto: AddProductDto) {
    const { user, middle_data } = request;
    return await this.manageProductService.addProduct(dto, user, middle_data);
  }
}
