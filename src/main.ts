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

  // 取得允許cors的相關網域
  const frontend_domain = app.get(ConfigService).get('FRONTEND_DOMAIN');
  const pr_frontend_domain = new RegExp(
    app.get(ConfigService).get('PR_FRONTEND_DOMAIN'),
  );
  const custom_frontend_domain = app
    .get(ConfigService)
    .get('CUSTOM_FRONTEND_DOMAIN');
  const client_test_port = app.get(ConfigService).get('CLIENT_TEST_PORT');

  app.enableCors({
    origin: [
      frontend_domain,
      pr_frontend_domain,
      custom_frontend_domain,
      `http://localhost:${client_test_port}`,
    ],
  });

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
    .build();
  const document = SwaggerModule.createDocument(app, configs);
  const options: SwaggerCustomOptions = {
    explorer: true,
    swaggerOptions: {
      filter: true,
    },
  };
  SwaggerModule.setup('swagger-ui', app, document, options);
}

bootstrap();
