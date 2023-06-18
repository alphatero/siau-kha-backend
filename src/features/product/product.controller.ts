import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards';
import {
  getProductListExample,
  getProductTagsExample,
  getProductExample,
} from './apiExample';
import { CreateProductTagDto } from './dto/create-product-tag.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@UseGuards(JwtGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '取得所有商品類別' })
  @ApiResponse({
    status: 200,
    schema: {
      example: getProductTagsExample,
    },
  })
  @Get('/tags')
  async getProductTags() {
    const documents = await this.productService.getProductTags();
    const product_tags = documents.map((doc) => {
      const { _id, tag_name, sort_no } = doc.toJSON();
      return {
        id: _id,
        tag_name,
        sort_no,
      };
    });
    return { product_tags };
  }

  @ApiExcludeEndpoint()
  @ApiBearerAuth()
  @Post('/tags')
  async createTable(@Req() request, @Body() dto: CreateProductTagDto) {
    const { user } = request;
    return await this.productService.createProductTag(dto, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '取得單一類別商品列表' })
  @ApiQuery({ name: 'tag_id', required: false })
  @ApiQuery({ name: 'product_name', required: false })
  @ApiResponse({
    status: 200,
    schema: {
      example: getProductListExample,
    },
  })
  @Get('/list')
  async getProductList(
    @Query('tag_id') tag_id,
    @Query('product_name') product_name,
  ) {
    const documents = await this.productService.getProducts({
      tag_id,
      product_name,
    });
    const product_list = documents.map((doc) => {
      const {
        _id,
        product_name,
        product_type,
        product_tags,
        product_image,
        product_price,
        product_note,
      } = doc.toJSON();
      return {
        id: _id,
        product_name,
        product_type,
        product_tags,
        product_image,
        product_price,
        product_note,
      };
    });
    return { product_list };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '取得單一商品資訊' })
  @ApiResponse({
    status: 200,
    schema: {
      example: getProductExample,
    },
  })
  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct({ id });
    const {
      _id,
      product_name,
      product_type,
      product_tags,
      product_price,
      product_note,
    } = product;
    return {
      product: {
        id: _id,
        product_name,
        product_type,
        product_tags,
        product_price,
        product_note,
      },
    };
  }
}
