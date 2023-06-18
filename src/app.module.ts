import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  GLOBAL_VALIDATION_PIPE,
  GLOBAL_RESPONSE_INTERCEPTOR,
  GLOBAL_HTTP_EXCEPTION,
} from './common/providers';
import secretConfig from './configs/secret.config';
import databaseConfig from './configs/database.config';
import adminConfig from './configs/admin.config';

import { AuthModule } from './features/auth';
import { UserModule } from './features/user';
import { TableModule } from './features/table';
import { ImageModule } from './features/image';
import { ActivitiesModule } from './features/activities';
import { ProductModule } from './features/product';
import { OrderSocketModule } from './features/order-socket';
import { OrderDetailModule } from './features/order-detail';
import { OrderModule } from './features/order';
import { ReservationModule } from './features/reservation';
import { ManageProductModule } from './features/manage/manage-product';
import { FoodItemsModule } from './features/manage/food-items';
import { CheckOutModule } from './features/check-out';
import { ManageActivitiesModule } from './features/manage/manage-activities/manage-activities.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, secretConfig, adminConfig],
    }),
    // 建立資料庫連線
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.uri'),
      }),
    }),
    AuthModule,
    UserModule,
    TableModule,
    ProductModule,
    ActivitiesModule,
    ReservationModule,
    ImageModule,
    OrderSocketModule,
    OrderDetailModule,
    OrderModule,
    ManageProductModule,
    FoodItemsModule,
    CheckOutModule,
    ManageActivitiesModule,
  ],
  providers: [
    // * DTO 驗證
    GLOBAL_VALIDATION_PIPE,
    // * 回傳資料格式
    GLOBAL_RESPONSE_INTERCEPTOR,
    // * 全域錯誤處理
    GLOBAL_HTTP_EXCEPTION,
  ],
})
export class AppModule {}
