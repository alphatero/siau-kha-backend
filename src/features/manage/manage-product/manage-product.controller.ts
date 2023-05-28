import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards';
import { basicExample } from 'src/common/utils/apiExample';
import {
  getTagsExample,
  getProductListExample,
  getProductExample,
} from './apiExample';
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
  @Patch('close-tag/:t_id')
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

  @ApiOperation({ summary: '管理端-取得所有商品' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    schema: {
      example: getProductListExample,
    },
  })
  @Get('get-all-products')
  async getProducts() {
    return await this.manageProductService.getProducts();
  }

  @ApiOperation({ summary: '管理端-取得單一商品' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'p_id',
    description: '商品id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: getProductExample,
    },
  })
  @Get('get-all-products/:p_id')
  async getProduct(@Param('p_id') p_id: string) {
    return await this.manageProductService.getProduct(p_id);
  }

  @ApiOperation({ summary: '管理端-編輯商品' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    schema: {
      example: basicExample,
    },
  })
  @Put('edit-product/:p_id')
  async editProduct(
    @Req() request,
    @Param('p_id') p_id: string,
    @Body() dto: AddProductDto,
  ) {
    const { user, middle_data } = request;
    return await this.manageProductService.editProduct(
      dto,
      user,
      middle_data,
      p_id,
    );
  }

  @ApiOperation({ summary: '管理端-刪除商品類別' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    schema: {
      example: basicExample,
    },
  })
  @Patch('close-product/:p_id')
  async closeProduct(@Req() request, @Param('p_id') p_id: string) {
    const { user } = request;
    return await this.manageProductService.closeProduct(p_id, user);
  }
}
