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
const update_table_dto_1 = require("./dto/update-table.dto");
let TableController = class TableController {
    constructor(tableService) {
        this.tableService = tableService;
    }
    async getTableList() {
        const documents = await this.tableService.getTableList();
        const table_list = documents.map((doc) => {
            var _a, _b, _c, _d;
            const table = doc.toJSON();
            const order_detail = (_a = table.order) === null || _a === void 0 ? void 0 : _a.order_detail.map((order_detail) => {
                return order_detail.product_detail.map((p) => {
                    return {
                        order_detail_id: order_detail['_id'],
                        id: p['_id'],
                        product_name: p.product_name,
                        status: p.status,
                        is_delete: p.is_delete,
                    };
                });
            });
            return {
                id: table._id,
                table_name: table.table_name,
                seat_max: table.seat_max,
                status: table.status,
                customer_num: (_b = table.order) === null || _b === void 0 ? void 0 : _b.customer_num,
                create_time: (_c = table.order) === null || _c === void 0 ? void 0 : _c.create_time,
                is_pay: (_d = table.order) === null || _d === void 0 ? void 0 : _d.is_pay,
                order_id: table.order ? table.order['_id'] : '',
                order_detail,
            };
        });
        return { table_list };
    }
    async createTable(dto) {
        return await this.tableService.createTable(dto);
    }
    async updateTable(request, id, dto) {
        const { user } = request;
        await this.tableService.updateTable(id, dto, user);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '取得所有桌況' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: {
                status: 'success',
                message: '成功',
                data: {
                    table_list: [
                        {
                            id: '644e543b893f163f3a3678f6',
                            table_name: 'TA 1',
                            seat_max: 0,
                            status: 'MEAL',
                            customer_num: 3,
                            create_time: '2023-04-30T16:00:00.000Z',
                            is_pay: false,
                            order_id: '644e5571020c9409fe694db5',
                            order_detail: [
                                [
                                    {
                                        order_detail_id: '645bded09373ce38a31ef49e',
                                        id: '645bded09373ce38a31ef49a',
                                        product_name: 'A5 日本和牛套餐',
                                        status: 'IN_PROGRESS',
                                        is_delete: false,
                                    },
                                    {
                                        order_detail_id: '645bded09373ce38a31ef49e',
                                        id: '645bded09373ce38a31ef49a',
                                        product_name: '豪華全牛套餐',
                                        status: 'IN_PROGRESS',
                                        is_delete: false,
                                    },
                                ],
                                [
                                    {
                                        order_detail_id: '645be06707b72ad4a95c1f59',
                                        id: '645be06607b72ad4a95c1f53',
                                        product_name: '可爾必思',
                                        status: 'IN_PROGRESS',
                                        is_delete: false,
                                    },
                                ],
                            ],
                        },
                        {
                            id: '644e54a6893f163f3a3678f8',
                            table_name: 'TA 2',
                            seat_max: 0,
                            status: 'IDLE',
                        },
                    ],
                },
            },
        },
    }),
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
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '更新桌況 - 安排入座 / 清潔完成' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: {
                status: 'success',
                message: '成功',
            },
        },
    }),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_table_dto_1.UpdateTableDto]),
    __metadata("design:returntype", Promise)
], TableController.prototype, "updateTable", null);
TableController = __decorate([
    (0, swagger_1.ApiTags)('Table'),
    (0, common_1.UseGuards)(guards_1.JwtGuard),
    (0, common_1.Controller)('table'),
    __metadata("design:paramtypes", [table_service_1.TableService])
], TableController);
exports.TableController = TableController;
//# sourceMappingURL=table.controller.js.map