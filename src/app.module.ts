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
    ImageModule,
  ],
  controllers: [],
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
