import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  GLOBAL_VALIDATION_PIPE,
  GLOBAL_RESPONSE_INTERCEPTOR,
  GLOBAL_HTTP_EXCEPTION,
} from './common/providers';

import { AppController } from './app.controller';

import secretConfig from './configs/secret.config';
import databaseConfig from './configs/database.config';
import adminConfig from './configs/admin.config';

// import { AuthModule } from './features/auth';
import { UserModule } from './features/user';
// import { TodoModule } from './features/todo';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, secretConfig, adminConfig],
    }),
    // todo 建立資料庫連線
    MongooseModule.forRootAsync({
      imports: [ConfigModule, UserModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.uri'),
      }),
    }),

    // todo 建立權限管理模組
    // AuthModule,
  ],
  controllers: [AppController],
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
