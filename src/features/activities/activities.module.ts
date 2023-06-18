import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { Activities, ActivitiesSchema } from 'src/core/models/activities';
import { ActivitiesMiddleware } from 'src/common/middleware';

@Module({
  imports: [
    // 建立Mongo資料庫連線
    MongooseModule.forFeature([
      {
        name: Activities.name,
        schema: ActivitiesSchema,
      },
    ]),
  ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  exports: [ActivitiesService],
})
export class ActivitiesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ActivitiesMiddleware)
      .forRoutes({ path: 'activities', method: RequestMethod.POST });
  }
}
