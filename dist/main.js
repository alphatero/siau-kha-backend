"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    const port = app.get(config_1.ConfigService).get('PORT');
    const frontend_domain = app.get(config_1.ConfigService).get('FRONTEND_DOMAIN');
    const pr_frontend_domain = new RegExp(app.get(config_1.ConfigService).get('PR_FRONTEND_DOMAIN'));
    const custom_frontend_domain = app
        .get(config_1.ConfigService)
        .get('CUSTOM_FRONTEND_DOMAIN');
    const client_test_port = app.get(config_1.ConfigService).get('CLIENT_TEST_PORT');
    app.enableCors({
        origin: [
            frontend_domain,
            pr_frontend_domain,
            custom_frontend_domain,
            `http://localhost:${client_test_port}`,
        ],
    });
    setupSwagger(app);
    await app.listen(port);
}
function setupSwagger(app) {
    const configs = new swagger_1.DocumentBuilder()
        .setTitle('siau-kha API')
        .setDescription('siau-kha Swagger')
        .setVersion('0.1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, configs);
    const options = {
        explorer: true,
        swaggerOptions: {
            filter: true,
        },
    };
    swagger_1.SwaggerModule.setup('swagger-ui', app, document, options);
}
bootstrap();
//# sourceMappingURL=main.js.map