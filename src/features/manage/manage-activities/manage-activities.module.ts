import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ManageActivitiesController } from './manage-activities.controller';
import { ManageActivitiesService } from './manage-activities.service';

import { Activities, ActivitiesSchema } from 'src/core/models/activities';
import { ProductList, ProductListSchema } from 'src/core/models/product-list';

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
})
export class ManageActivitiesModule {}
