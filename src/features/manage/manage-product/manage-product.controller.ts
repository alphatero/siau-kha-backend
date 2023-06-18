import {
  Body,
  Controller,
  Delete,
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
import {
  AddTagDto,
  AddProductDto,
  SortingDto,
  ChangeTagStatusDto,
  UpdateProductDto,
} from './dto';
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
  @Get('/tags')
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
  @Post('/tag')
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
  @Patch('/:t_id')
  async editProductTag(
    @Req() request,
    @Param('t_id') id: string,
    @Body() dto: AddTagDto,
  ) {
    const { user } = request;
    return await this.manageProductService.editProductTag(dto, id, user);
  }

  @ApiOperation({ summary: '管理端-編輯商品類別狀態' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    schema: {
      example: basicExample,
    },
  })
  @Patch('/tags/status/:t_id')
  async handleProductTagStatus(
    @Req() request,
    @Param('t_id') id: string,
    @Body() dto: ChangeTagStatusDto,
  ) {
    const { user } = request;
    return await this.manageProductService.handleProductTagStatus(
      dto,
      id,
      user,
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
  @Delete('/:t_id')
  async deleteProductTag(@Req() request, @Param('t_id') t_id: string) {
    const { user } = request;
    return await this.manageProductService.deleteProductTag(t_id, user);
  }

  @ApiOperation({ summary: '管理端-調整商品類別排序' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    schema: {
      example: basicExample,
    },
  })
  @Patch('/tags/sorting')
  async changeProductTagSortNo(@Req() request, @Body() dto: SortingDto) {
    const { user } = request;
    return await this.manageProductService.changeProductTagSortNo(dto, user);
  }

  @ApiOperation({ summary: '管理端-新增商品' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    schema: {
      example: basicExample,
    },
  })
  @Post('')
  async addProduct(@Req() request, @Body() dto: AddProductDto) {
    const { user, middle_data } = request;
    return await this.manageProductService.addProduct(dto, user, middle_data);
  }

  @ApiOperation({ summary: '管理端-取得商品' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    schema: {
      example: getProductListExample,
    },
  })
  @Get()
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
  @Get('/:p_id')
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
  @Put('/:p_id')
  async updateProduct(
    @Req() request,
    @Param('p_id') p_id: string,
    @Body() dto: UpdateProductDto,
  ) {
    const { user, middle_data } = request;
    return await this.manageProductService.updateProduct(
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
  @Patch('/:p_id')
  async closeProduct(@Req() request, @Param('p_id') p_id: string) {
    const { user } = request;
    return await this.manageProductService.closeProduct(p_id, user);
  }
}
