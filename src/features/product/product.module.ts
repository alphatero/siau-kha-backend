import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductList, ProductListSchema } from 'src/core/models/product-list';
import { ProductTags, ProductTagsSchema } from 'src/core/models/product-tags';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    // 建立Mongo資料庫連線
    MongooseModule.forFeature([
      {
        name: ProductTags.name,
        schema: ProductTagsSchema,
      },
      {
        name: ProductList.name,
        schema: ProductListSchema,
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
