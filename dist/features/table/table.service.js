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
exports.TableService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const time_1 = require("../../common/utils/time");
const order_1 = require("../../core/models/order");
const table_main_1 = require("../../core/models/table-main");
let TableService = class TableService {
    constructor(tableMainModel, orderModel) {
        this.tableMainModel = tableMainModel;
        this.orderModel = orderModel;
    }
    async createTable(dto) {
        return this.tableMainModel.create(dto);
    }
    async getTableList(filters) {
        const documents = await this.tableMainModel.find(filters);
        const table_list = documents.map((doc) => {
            var _a, _b, _c, _d;
            const table = doc.toJSON();
            const order_detail = (_a = table.order) === null || _a === void 0 ? void 0 : _a.order_detail.map((order_detail) => {
                return order_detail.product_detail.map((p) => {
                    return {
                        order_detail_id: order_detail['_id'],
                        id: p['_id'],
                        product_name: p.product_name,
                        product_quantity: p.product_quantity,
                        product_note: p.product_note,
                        status: p.status,
                        is_delete: p.is_delete,
                        order_time: (0, time_1.formatDateTime)(order_detail.create_time),
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
        return table_list;
    }
    async updateTable(id, dto, user) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('id 格式錯誤');
        }
        const table_main = await this.tableMainModel.findById(id).exec();
        if (!table_main || table_main.is_delete) {
            throw new common_1.BadRequestException('找不到此桌號');
        }
        if (table_main.status === dto.status) {
            throw new common_1.BadRequestException(`目前狀態已為 ${dto.status} ， 不同重複設置相同桌況`);
        }
        switch (dto.status) {
            case table_main_1.TableStatus.MEAL:
                if (dto.customer_num <= 0)
                    throw new common_1.BadRequestException('安排入座, 用餐人數須大於0');
                if (dto.customer_num > table_main.seat_max + 2)
                    throw new common_1.BadRequestException(`預設可容納人數為 ${table_main.seat_max}, 實際人數可超過「預設可容納人數」最多兩位`);
                if (table_main.status === table_main_1.TableStatus.MEAL)
                    throw new common_1.BadRequestException('此桌次為用餐中, 無法安排入座');
                break;
            case table_main_1.TableStatus.IDLE:
                const order_id = table_main.order;
                const order = await this.orderModel.findById(order_id).exec();
                if (!order.is_pay)
                    throw new common_1.BadRequestException('尚未結帳，不得清潔桌位');
        }
        const tableSession = await this.tableMainModel.db.startSession();
        const orderSession = await this.orderModel.db.startSession();
        tableSession.startTransaction();
        orderSession.startTransaction();
        try {
            if (dto.status === table_main_1.TableStatus.MEAL) {
                const createdOrder = await this.orderModel.create([
                    {
                        table_main: new mongoose_2.Types.ObjectId(id),
                        customer_num: dto.customer_num,
                        status: order_1.OrderStatus.IN_PROGRESS,
                        create_user: new mongoose_2.Types.ObjectId(user.id),
                    },
                ], {
                    session: orderSession,
                });
                await this.tableMainModel.findByIdAndUpdate(id, {
                    status: table_main_1.TableStatus.MEAL,
                    order: new mongoose_2.Types.ObjectId(createdOrder[0]._id),
                }, {
                    session: tableSession,
                });
            }
            else if (dto.status === table_main_1.TableStatus.IDLE) {
                await this.orderModel.findByIdAndUpdate(table_main.order, {
                    status: order_1.OrderStatus.SUCCESS,
                }, {
                    session: tableSession,
                });
                await this.tableMainModel.findByIdAndUpdate(id, {
                    status: table_main_1.TableStatus.IDLE,
                    $unset: { order: '' },
                }, {
                    session: tableSession,
                });
            }
            await tableSession.commitTransaction();
            await orderSession.commitTransaction();
        }
        catch (error) {
            await tableSession.abortTransaction();
            await orderSession.abortTransaction();
            throw error;
        }
        finally {
            tableSession.endSession();
            orderSession.endSession();
        }
    }
};
TableService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(table_main_1.TableMain.name)),
    __param(1, (0, mongoose_1.InjectModel)(order_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], TableService);
exports.TableService = TableService;
//# sourceMappingURL=table.service.js.map