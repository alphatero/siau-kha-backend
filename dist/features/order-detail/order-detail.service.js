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
exports.OrderDetailService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_detail_1 = require("../../core/models/product-detail");
const product_detail_2 = require("../../core/models/product-detail");
const order_1 = require("../../core/models/order");
const order_detail_1 = require("../../core/models/order-detail");
const product_list_1 = require("../../core/models/product-list");
const validate_1 = require("../../common/utils/validate");
let OrderDetailService = class OrderDetailService {
    constructor(orderModel, orderDetailModel, productDetailModel, productListModel) {
        this.orderModel = orderModel;
        this.orderDetailModel = orderDetailModel;
        this.productDetailModel = productDetailModel;
        this.productListModel = productListModel;
    }
    async orderFlow(dto, order_id) {
        const productIdsInRequest = dto.product_detail.map((product_detail) => ({
            product_id: product_detail.product_id,
        }));
        (0, validate_1.validateObjectIds)({
            order_id,
            productIdsInRequest,
        });
        const order = await this.orderModel.findById(order_id).exec();
        if (!order) {
            throw new common_1.BadRequestException('找不到此筆訂單');
        }
        const productDetailSession = await this.productDetailModel.db.startSession();
        const orderDetailSession = await this.orderDetailModel.db.startSession();
        const orderSession = await this.orderModel.db.startSession();
        productDetailSession.startTransaction();
        orderDetailSession.startTransaction();
        orderSession.startTransaction();
        try {
            const createdProductDetails = await this.createProductDetail(dto, order_id, { session: productDetailSession });
            const product_detail = createdProductDetails.map((productDetail) => productDetail._id);
            const order_detail_total = createdProductDetails.reduce((acc, cur) => {
                if (!cur.is_delete) {
                    return acc + cur.product_price * cur.product_quantity;
                }
                return acc;
            }, 0);
            const order = await this.orderModel.findById(order_id).exec();
            const { create_user } = order;
            const createdOrderDetail = await this.createOrderDetail(order_id, product_detail, order_detail_total, create_user, { session: orderDetailSession });
            await this.updateOrder(order_id, order_detail_total, createdOrderDetail, {
                session: orderSession,
            });
            const result = createdOrderDetail.map((item) => ({
                order: item.order,
                product_detail: item.product_detail,
                total: item.total,
                id: item._id,
                create_time: item.create_time,
                updateAt: item.update_time,
            }));
            await productDetailSession.commitTransaction();
            await orderDetailSession.commitTransaction();
            await orderSession.commitTransaction();
            return result;
        }
        catch (error) {
            await productDetailSession.abortTransaction();
            await orderDetailSession.abortTransaction();
            await orderSession.abortTransaction();
            throw error;
        }
        finally {
            await orderSession.endSession();
            await orderDetailSession.endSession();
            await productDetailSession.endSession();
        }
    }
    async createProductDetail(dto, order_id, opts) {
        const productIds = dto.product_detail.map((product) => product.product_id);
        const productDatas = await this.productListModel
            .find({ _id: { $in: productIds } })
            .exec();
        const foundProductIds = productDatas.map((productData) => productData._id.toString());
        const notFoundProductIds = productIds.filter((productId) => !foundProductIds.includes(productId));
        if (notFoundProductIds.length > 0) {
            throw new common_1.BadRequestException(`找不到此: ${notFoundProductIds.join(', ')} 商品`);
        }
        const productDataMap = productDatas.reduce((map, productData) => {
            map[productData._id] = productData;
            return map;
        }, {});
        const productDetails = dto.product_detail.map((product) => {
            const productData = productDataMap[product.product_id];
            if (!productData)
                throw new common_1.BadRequestException(`找不到此筆單品`);
            const { product_name, product_price } = productData;
            const { product_quantity, product_note } = product;
            return {
                product_id: product.product_id,
                product_name: product_name,
                product_price: product_price,
                product_final_price: product_price,
                product_quantity: product_quantity,
                product_note: product_note,
                order_id: new mongoose_2.Types.ObjectId(order_id),
                status: product_detail_1.ProductDetailStatus.IN_PROGRESS,
                is_delete: false,
            };
        });
        return await this.productDetailModel.insertMany(productDetails, opts);
    }
    async createOrderDetail(order_id, product_detail, order_detail_total, create_user, opts) {
        return await this.orderDetailModel.create([
            {
                order: new mongoose_2.Types.ObjectId(order_id),
                product_detail: product_detail,
                total: order_detail_total,
                create_user: create_user,
            },
        ], {
            session: opts.session,
        });
    }
    async updateOrder(order_id, order_detail_total, createdOrderDetail, opts) {
        const order = await this.orderModel.findById(order_id).exec();
        const { total } = order;
        return await this.orderModel.findByIdAndUpdate(order_id, {
            total: total + order_detail_total,
            $push: { order_detail: new mongoose_2.Types.ObjectId(createdOrderDetail[0]._id) },
        }, {
            session: opts.session,
            new: true,
        });
    }
    async getOrderDetail(id) {
        (0, validate_1.validateObjectIds)({ oredr_id: id });
        try {
            const order = await this.orderModel.findById(id).exec();
            const result = {
                order_detail: order.order_detail.map((detail) => ({
                    id: detail._id,
                    product_detail: detail.product_detail.map((product) => ({
                        id: product.id,
                        product_name: product.product_name,
                        product_price: product.product_price,
                        product_quantity: product.product_quantity,
                        product_note: product.product_note,
                        status: product.status,
                        is_delete: product.is_delete,
                    })),
                    create_time: detail.create_time,
                })),
                total: order.final_total,
            };
            return result;
        }
        catch (error) {
            throw new common_1.BadRequestException('找不到此筆訂單');
        }
    }
    async deleteOrderDetail(orderId, detailId, pId) {
        (0, validate_1.validateObjectIds)({
            order_id: orderId,
            order_detail_id: detailId,
            product_detail_id: pId,
        });
        const productDetailSession = await this.productDetailModel.db.startSession();
        const orderDetailSession = await this.orderDetailModel.db.startSession();
        const orderSession = await this.orderModel.db.startSession();
        productDetailSession.startTransaction();
        orderDetailSession.startTransaction();
        orderSession.startTransaction();
        try {
            const order = await this.orderModel.findById(orderId).exec();
            if (!order)
                throw new common_1.BadRequestException('找不到此筆訂單');
            const orderDetail = await this.orderDetailModel.findById(detailId).exec();
            if (!orderDetail)
                throw new common_1.BadRequestException('無找不到此筆訂單明細');
            const { product_detail } = orderDetail;
            const productDetailIsExist = product_detail.findIndex((detail) => detail._id.toString() === pId);
            if (productDetailIsExist === -1) {
                throw new common_1.BadRequestException('找不到此筆單品');
            }
            if (product_detail[productDetailIsExist].status ===
                product_detail_1.ProductDetailStatus.FINISH) {
                throw new common_1.BadRequestException('此訂單已完成，不可退點');
            }
            if (product_detail[productDetailIsExist].status ===
                product_detail_1.ProductDetailStatus.SUCCESS) {
                throw new common_1.BadRequestException('此訂單已送出，不可退點');
            }
            if (product_detail[productDetailIsExist].is_delete) {
                throw new common_1.BadRequestException('此訂單已刪除，不可退點');
            }
            await this.productDetailModel.findByIdAndUpdate(pId, {
                $set: {
                    is_delete: true,
                },
            }, { new: true, session: productDetailSession });
            const deduct = product_detail[productDetailIsExist].product_price *
                product_detail[productDetailIsExist].product_quantity;
            const { total: orderDetailTotal } = orderDetail;
            const newOrderDetailTotal = orderDetailTotal - deduct;
            await this.orderDetailModel.findByIdAndUpdate(detailId, {
                $set: {
                    total: newOrderDetailTotal,
                },
            }, { new: true, session: orderDetailSession });
            const { total: OrderTotal } = order;
            const newOrderTotal = OrderTotal - deduct;
            await this.orderModel.findByIdAndUpdate(orderId, {
                $set: {
                    total: newOrderTotal,
                },
            }, { new: true, session: orderSession });
            await productDetailSession.commitTransaction();
            await orderDetailSession.commitTransaction();
            await orderSession.commitTransaction();
        }
        catch (error) {
            await productDetailSession.abortTransaction();
            await orderDetailSession.abortTransaction();
            await orderSession.abortTransaction();
            throw error;
        }
        finally {
            productDetailSession.endSession();
            orderDetailSession.endSession();
            orderSession.endSession();
        }
    }
    async patchOrderDetail(orderId, detailId, pId, actionType) {
        (0, validate_1.validateObjectIds)({
            order_id: orderId,
            order_detail_id: detailId,
            product_detail_id: pId,
        });
        const order = await this.orderModel.findById(orderId).exec();
        if (!order)
            throw new common_1.BadRequestException('找不到此筆訂單');
        const orderDetailIsExist = order.order_detail.findIndex((detail) => detail._id.toString() === detailId);
        if (orderDetailIsExist === -1) {
            throw new common_1.BadRequestException('找不到此筆訂單明細');
        }
        const orderDetail = order.order_detail[orderDetailIsExist];
        const { product_detail } = orderDetail;
        const productDetailIsExist = product_detail.findIndex((detail) => detail._id.toString() === pId);
        if (productDetailIsExist === -1) {
            throw new common_1.BadRequestException('找不到此筆單品');
        }
        if (actionType === product_detail_1.ProductDetailStatus.SUCCESS) {
            if (product_detail[productDetailIsExist].is_delete) {
                throw new common_1.BadRequestException('此單品已經退點，不可上菜');
            }
            if (product_detail[productDetailIsExist].status ===
                product_detail_1.ProductDetailStatus.IN_PROGRESS) {
                throw new common_1.BadRequestException('此單品尚未完成，不可上菜');
            }
            if (product_detail[productDetailIsExist].status ===
                product_detail_1.ProductDetailStatus.SUCCESS) {
                throw new common_1.BadRequestException('此單品已經上菜過');
            }
        }
        else if (actionType === product_detail_1.ProductDetailStatus.FINISH) {
            if (product_detail[productDetailIsExist].is_delete) {
                throw new common_1.BadRequestException('此單品已經退點，不可出菜');
            }
            if (product_detail[productDetailIsExist].status ===
                product_detail_1.ProductDetailStatus.SUCCESS) {
                throw new common_1.BadRequestException('此單品已上菜，不可出菜');
            }
            if (product_detail[productDetailIsExist].status ===
                product_detail_1.ProductDetailStatus.FINISH) {
                throw new common_1.BadRequestException('此單品已經出菜過');
            }
        }
        await this.productDetailModel.findByIdAndUpdate(pId, {
            $set: {
                status: actionType,
            },
        }, { new: true });
        return {};
    }
};
OrderDetailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(order_detail_1.OrderDetail.name)),
    __param(2, (0, mongoose_1.InjectModel)(product_detail_2.ProductDetail.name)),
    __param(3, (0, mongoose_1.InjectModel)(product_list_1.ProductList.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], OrderDetailService);
exports.OrderDetailService = OrderDetailService;
//# sourceMappingURL=order-detail.service.js.map