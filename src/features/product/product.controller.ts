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
      example: {
        status: 'success',
        message: '成功',
        data: {
          product_tags: [
            {
              id: '64568af83e7dc038127b7f19',
              tag_name: '主廚特選套餐',
              sort_no: 1,
            },
          ],
        },
      },
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
      example: {
        status: 'success',
        message: '成功',
        data: {
          product_list: [
            {
              id: '6457444fb88d606c8c658f74',
              product_name: 'A5 日本和牛套餐',
              product_type: '2',
              product_tags: '64568af83e7dc038127b7f19',
              product_image:
                'https://storage.googleapis.com/nestjsproject-image.appspot.com/images/44402f8c-3819-4408-9306-c2b1c9f26908.jpg?GoogleAccessId=firebase-adminsdk-at27n%40nestjsproject-image.iam.gserviceaccount.com&Expires=16730294400&Signature=WPwLE4ksKcwudcfwZeIxN8DCG9H6s3zJHecTfr7q%2F1cmHmHDXpKHBiotJsd730e62dGYyrz%2BXK9J325Xnqo8J4KWm9M3FJK6idrxDbU7zRQaqlJBsI5xhK8Qzf%2BUI2DigyZd%2Bvc8iGHTuLTvMlcEw3hKnXD8N5LIuriypbIgMa%2FIEpejymxpRFcG9tCbsr1BdaDebCX93X2UdVYZgI50mPxz7j2yGtOK6JwArCtZEofm0LWBagqB2D3DxsGAajPg50i9KDU%2BBNtrrPFxxvKAlZFw3dsJc%2B3l8OK5q9uTBDOmO03pbVoADlFyGl2Ww7yhBtPLkk1EgZN0iQg2yPCtBg%3D%3D',
              product_price: 2200,
            },
          ],
        },
      },
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
      } = doc.toJSON();
      return {
        id: _id,
        product_name,
        product_type,
        product_tags,
        product_image,
        product_price,
      };
    });
    return { product_list };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '取得單一商品資訊' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: 'success',
        message: '成功',
        data: {
          product: {
            id: '6457444fb88d606c8c658f74',
            product_name: 'A5 日本和牛套餐',
            product_type: '2',
            product_tags: '64568af83e7dc038127b7f19',
            product_price: 2200,
            product_note: ['飯少', '瘦肉多一點'],
          },
        },
      },
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
