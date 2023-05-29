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
        const query = this.tableMainModel.find(filters);
        return query;
    }
    async updateTable(id, dto, user) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('id 格式錯誤');
        }
        const table_main = await this.tableMainModel.findById(id).exec();
        if (!table_main || table_main.is_delete) {
            throw new common_1.BadRequestException('找不到此桌號');
        }
        switch (dto.status) {
            case table_main_1.TableStatus.MEAL:
                if (dto.customer_num <= 0)
                    throw new common_1.BadRequestException('安排入座, 用餐人數須大於0');
                else if (dto.customer_num > table_main.seat_max + 2)
                    throw new common_1.BadRequestException(`預設可容納人數為 ${table_main.seat_max}, 實際人數可超過「預設可容納人數」最多兩位`);
                else if (table_main.status === table_main_1.TableStatus.MEAL)
                    throw new common_1.BadRequestException('此桌次為用餐中, 無法安排入座');
                break;
            case table_main_1.TableStatus.IDLE:
                if (dto.customer_num !== 0)
                    throw new common_1.BadRequestException('清潔完成, 人數須為 0');
                break;
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