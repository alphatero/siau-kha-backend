import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 設定全域路由前綴
  app.setGlobalPrefix('api');

  // 取得port環境變數
  const port = app.get(ConfigService).get('PORT');

  // 設定Swagger
  setupSwagger(app);
  await app.listen(port);
}

function setupSwagger(app: INestApplication) {
  const configs = new DocumentBuilder()
    .setTitle('siau-kha API')
    .setDescription('siau-kha Swagger')
    .setVersion('0.1.0')
    .addBearerAuth()
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, configs);
  const options: SwaggerCustomOptions = {
    explorer: true,
  };
  SwaggerModule.setup('swagger-ui', app, document, options);
}

bootstrap();
