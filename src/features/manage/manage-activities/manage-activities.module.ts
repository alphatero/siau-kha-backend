import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ManageActivitiesController } from './manage-activities.controller';
import { ManageActivitiesService } from './manage-activities.service';

import { Activities, ActivitiesSchema } from 'src/core/models/activities';
import { ProductList, ProductListSchema } from 'src/core/models/product-list';
import { ActivitiesMiddleware } from 'src/common/middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Activities.name,
        schema: ActivitiesSchema,
      },
      {
        name: ProductList.name,
        schema: ProductListSchema,
      },
    ]),
  ],
  controllers: [ManageActivitiesController],
  providers: [ManageActivitiesService],
  exports: [ManageActivitiesService],
})
export class ManageActivitiesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ActivitiesMiddleware)
      .forRoutes(
        { path: 'manage/act-manage/*', method: RequestMethod.POST },
        { path: 'manage/act-manage/*', method: RequestMethod.PATCH },
      );
  }
}
