"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../../common/guards");
const table_service_1 = require("./table.service");
const create_table_dto_1 = require("./dto/create-table.dto");
let TableController = class TableController {
    constructor(tableService) {
        this.tableService = tableService;
    }
    async getTableList() {
        const documents = await this.tableService.getTableList();
        const table_list = documents.map((doc) => {
            var _a, _b, _c;
            const table = doc.toJSON();
            return {
                id: table._id,
                table_name: table.table_name,
                seat_max: table.seat_max,
                status: table.status,
                customer_num: (_a = table.order) === null || _a === void 0 ? void 0 : _a.customer_num,
                create_time: (_b = table.order) === null || _b === void 0 ? void 0 : _b.create_time,
                is_pay: (_c = table.order) === null || _c === void 0 ? void 0 : _c.is_pay,
            };
        });
        return { table_list };
    }
    async createTable(dto) {
        return await this.tableService.createTable(dto);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TableController.prototype, "getTableList", null);
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_table_dto_1.CreateTableDto]),
    __metadata("design:returntype", Promise)
], TableController.prototype, "createTable", null);
TableController = __decorate([
    (0, swagger_1.ApiTags)('Table'),
    (0, common_1.UseGuards)(guards_1.JwtGuard),
    (0, common_1.Controller)('table'),
    __metadata("design:paramtypes", [table_service_1.TableService])
], TableController);
exports.TableController = TableController;
//# sourceMappingURL=table.controller.js.map