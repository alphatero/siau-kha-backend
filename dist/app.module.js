"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const providers_1 = require("./common/providers");
const secret_config_1 = require("./configs/secret.config");
const database_config_1 = require("./configs/database.config");
const admin_config_1 = require("./configs/admin.config");
const auth_1 = require("./features/auth");
const user_1 = require("./features/user");
const table_1 = require("./features/table");
const image_1 = require("./features/image");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [database_config_1.default, secret_config_1.default, admin_config_1.default],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    uri: configService.get('mongo.uri'),
                }),
            }),
            auth_1.AuthModule,
            user_1.UserModule,
            table_1.TableModule,
            image_1.ImageModule,
        ],
        controllers: [],
        providers: [
            providers_1.GLOBAL_VALIDATION_PIPE,
            providers_1.GLOBAL_RESPONSE_INTERCEPTOR,
            providers_1.GLOBAL_HTTP_EXCEPTION,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map