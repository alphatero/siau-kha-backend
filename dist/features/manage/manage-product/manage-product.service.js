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
exports.ManageProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const food_item_1 = require("../../../core/models/food-item");
const product_list_1 = require("../../../core/models/product-list");
const product_tags_1 = require("../../../core/models/product-tags");
let ManageProductService = class ManageProductService {
    constructor(productTagsModel, productListModel, foodItemModel) {
        this.productTagsModel = productTagsModel;
        this.productListModel = productListModel;
        this.foodItemModel = foodItemModel;
    }
    async getProductTags() {
        const documents = await this.findTags();
        const list = documents.map((doc) => {
            const { _id, tag_name, status, sort_no } = doc.toJSON();
            return {
                id: _id,
                tag_name,
                status,
                sort_no,
            };
        });
        return { list };
    }
    async createProductTag(dto, user) {
        const documents = await this.findTags();
        const repeat = documents.find((doc) => doc.tag_name === dto.tag_name);
        if (repeat) {
            throw new common_1.BadRequestException('商品類別名稱重複');
        }
        else {
            const sort_no = documents.length
                ? documents[documents.length - 1].sort_no + 1
                : 1;
            const createData = {
                tag_name: dto.tag_name,
                create_user: new mongoose_2.Types.ObjectId(user.id),
                set_state_time: new Date(),
                set_state_user: new mongoose_2.Types.ObjectId(user.id),
                sort_no,
            };
            await this.productTagsModel.create(createData);
        }
    }
    async editProductTag(dto, id, user) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('id 格式錯誤');
        }
        const targetTag = await this.findTag(id);
        if (!targetTag) {
            throw new common_1.BadRequestException('商品類別不存在');
        }
        if (targetTag.status === product_tags_1.ProductTagStatus.DISABLE) {
            throw new common_1.BadRequestException('商品類別已被刪除');
        }
        const updatedData = {
            tag_name: dto.tag_name,
            set_state_time: new Date(),
            set_state_user: new mongoose_2.Types.ObjectId(user.id),
        };
        await this.productTagsModel.findByIdAndUpdate(id, updatedData, {
            new: true,
        });
    }
    async handleProductTagStatus(dto, id, user) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('id 格式錯誤');
        }
        const targetTag = await this.findTag(id);
        if (!targetTag) {
            throw new common_1.BadRequestException('商品類別不存在');
        }
        if (dto.action === targetTag.status) {
            throw new common_1.BadRequestException(`商品類別已經處於 ${dto.action} 狀態`);
        }
        if (dto.action === product_tags_1.ProductTagStatus.DISABLE) {
            const sortNo = targetTag.sort_no;
            const tagSession = await this.productTagsModel.db.startSession();
            tagSession.startTransaction();
            try {
                const data = {
                    status: dto.action,
                    sort_no: 0,
                    set_state_time: new Date(),
                    set_state_user: new mongoose_2.Types.ObjectId(user.id),
                };
                await this.productTagsModel.findByIdAndUpdate(id, {
                    $set: data,
                }, {
                    session: tagSession,
                    new: true,
                });
                await this.productTagsModel.updateMany({ sort_no: { $gt: sortNo } }, {
                    $inc: { sort_no: -1 },
                    $set: {
                        set_state_time: new Date(),
                        set_state_user: new mongoose_2.Types.ObjectId(user.id),
                    },
                }, { session: tagSession, new: true });
                await tagSession.commitTransaction();
            }
            catch (error) {
                await tagSession.abortTransaction();
                throw error;
            }
            finally {
                tagSession.endSession();
            }
        }
        else {
            const documents = await this.findEnableTags();
            const data = {
                status: dto.action,
                sort_no: documents[documents.length - 1].sort_no + 1,
                set_state_time: new Date(),
                set_state_user: new mongoose_2.Types.ObjectId(user.id),
            };
            await this.productTagsModel.findByIdAndUpdate(id, {
                $set: data,
            }, {
                new: true,
            });
        }
    }
    async deleteProductTag(id, user) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('id 格式錯誤');
        }
        const targetTag = await this.findTag(id);
        if (!targetTag) {
            throw new common_1.BadRequestException('商品類別不存在');
        }
        if (targetTag.status === product_tags_1.ProductTagStatus.DISABLE) {
            throw new common_1.BadRequestException('商品類別已經被停用');
        }
        const sortNo = targetTag.sort_no;
        const tagSession = await this.productTagsModel.db.startSession();
        tagSession.startTransaction();
        try {
            await this.productTagsModel.findByIdAndRemove(id);
            await this.productTagsModel.updateMany({ sort_no: { $gt: sortNo } }, {
                $inc: { sort_no: -1 },
                $set: {
                    set_state_time: new Date(),
                    set_state_user: new mongoose_2.Types.ObjectId(user.id),
                },
            }, { session: tagSession, new: true });
            await tagSession.commitTransaction();
        }
        catch (error) {
            await tagSession.abortTransaction();
            throw error;
        }
        finally {
            tagSession.endSession();
        }
    }
    async changeProductTagSortNo(idList, user) {
        const duplicateList = [];
        const uniqueList = [];
        for (const item of idList.list) {
            if (duplicateList.includes(item)) {
                throw new common_1.BadRequestException(`id: ${item} 重複`);
            }
            else {
                duplicateList.push(item);
                uniqueList.push(new mongoose_2.Types.ObjectId(item));
            }
        }
        const tags = await this.productTagsModel
            .find({
            _id: { $in: uniqueList },
            status: product_tags_1.ProductTagStatus.ENABLE,
        })
            .select('_id');
        if (tags.length !== uniqueList.length) {
            const canChangeList = tags.map((doc) => {
                const { _id } = doc.toJSON();
                return _id;
            });
            throw new common_1.BadRequestException(`目標列表中，可正常取得的啟用商品類別為 [${canChangeList.toString()}]，請重新檢查是否輸入正確id、id格式及目標id資料的狀態`);
        }
        const tagSortingSession = await this.productTagsModel.db.startSession();
        tagSortingSession.startTransaction();
        try {
            for (let index = 0; index < uniqueList.length; index++) {
                const id = uniqueList[index];
                await this.productTagsModel.findByIdAndUpdate(id, {
                    $set: {
                        sort_no: index + 1,
                        set_state_time: new Date(),
                        set_state_user: new mongoose_2.Types.ObjectId(user.id),
                    },
                }, {
                    session: tagSortingSession,
                    new: true,
                });
            }
            await tagSortingSession.commitTransaction();
        }
        catch (error) {
            await tagSortingSession.abortTransaction();
            throw error;
        }
        finally {
            tagSortingSession.endSession();
        }
    }
    async addProduct(dto, user, middle_data) {
        const tagRes = await this.productTagsModel.findById(dto.product_tags);
        if (!tagRes) {
            throw new common_1.BadRequestException('商品類別不存在');
        }
        const foodLength = Object.keys(middle_data.food_consumption_list_obj).length;
        if (foodLength > 1) {
            const foodList = await this.foodItemModel.find({
                is_delete: false,
            });
            Object.keys(middle_data.food_consumption_list_obj).forEach((key) => {
                const exists = foodList.some((item) => item._id.toString() === key);
                if (!exists) {
                    throw new common_1.BadRequestException('所耗食材不存在');
                }
            });
        }
        else if (foodLength === 1) {
            const exists = await this.foodItemModel.findById(Object.keys(middle_data.food_consumption_list_obj)[0], {
                is_delete: false,
            });
            if (!exists) {
                throw new common_1.BadRequestException('所耗食材不存在');
            }
        }
        const createData = Object.assign(Object.assign({}, dto), { product_tags: new mongoose_2.Types.ObjectId(dto.product_tags), product_note: [...middle_data.product_note], food_consumption_list: [...middle_data.food_consumption_list], create_user: new mongoose_2.Types.ObjectId(user.id), is_delete: false, set_state_user: new mongoose_2.Types.ObjectId(user.id) });
        await this.productListModel.create(createData);
    }
    async getProducts() {
        const documents = await this.productListModel.find();
        const foodItems = await this.foodItemModel.find({
            is_delete: false,
        });
        const foodItemsObj = {};
        foodItems.forEach((item) => {
            foodItemsObj[item._id.toString()] = {
                food_item_name: item.food_items_name,
                group: item.group,
                purchase_cost: item.purchase_cost,
                item_stock: item.item_stock,
                safety_stock: item.safety_stock,
                status: item.status,
                units: item.units,
            };
        });
        const list = documents.map((doc) => {
            const { _id, product_name, product_type, product_tags, product_image, product_price, product_note, food_consumption_list, is_delete, } = doc.toJSON();
            const finalFoodList = this.doCombineData(food_consumption_list, foodItemsObj);
            product_note.forEach((item) => {
                item.food_consumption_list = this.doCombineData(item.food_consumption_list, foodItemsObj);
            });
            return {
                id: _id,
                product_name,
                product_type,
                product_tags,
                product_image,
                product_price,
                product_note,
                food_consumption_list: finalFoodList,
                is_delete,
            };
        });
        return { list };
    }
    async getProduct(p_id) {
        const document = await this.productListModel.findById(new mongoose_2.Types.ObjectId(p_id));
        const foodItems = await this.foodItemModel.find({
            is_delete: false,
        });
        const foodItemsObj = {};
        foodItems.forEach((item) => {
            foodItemsObj[item._id.toString()] = {
                food_item_name: item.food_items_name,
                group: item.group,
                purchase_cost: item.purchase_cost,
                item_stock: item.item_stock,
                safety_stock: item.safety_stock,
                status: item.status,
                units: item.units,
            };
        });
        const { _id, product_name, product_type, product_tags, product_image, product_price, product_note, food_consumption_list, } = document.toJSON();
        const finalFoodList = this.doCombineData(food_consumption_list, foodItemsObj);
        product_note.forEach((item) => {
            item.food_consumption_list = this.doCombineData(item.food_consumption_list, foodItemsObj);
        });
        return {
            id: _id,
            product_name,
            product_type,
            product_tags,
            product_image,
            product_price,
            product_note,
            food_consumption_list: finalFoodList,
        };
    }
    async updateProduct(dto, user, middle_data, p_id) {
        const hasProductTag = dto.hasOwnProperty('product_tags');
        const hasProductNote = dto.hasOwnProperty('product_note');
        const hasFoodConsumptionList = dto.hasOwnProperty('food_consumption_list');
        const productId = new mongoose_2.Types.ObjectId(p_id);
        const targetProduct = await this.productListModel.findById(productId);
        if (!targetProduct) {
            throw new common_1.BadRequestException('目標商品不存在');
        }
        if (hasProductTag) {
            const tagRes = await this.productTagsModel.findById(dto.product_tags);
            if (!tagRes) {
                throw new common_1.BadRequestException('商品類別不存在');
            }
        }
        const foodLength = Object.keys(middle_data.food_consumption_list_obj).length;
        if (foodLength > 1) {
            const foodList = await this.foodItemModel.find({
                is_delete: false,
            });
            Object.keys(middle_data.food_consumption_list_obj).forEach((key) => {
                const exists = foodList.some((item) => item._id.toString() === key);
                if (!exists) {
                    throw new common_1.BadRequestException('所耗食材不存在');
                }
            });
        }
        else if (foodLength === 1) {
            const exists = await this.foodItemModel.findById(Object.keys(middle_data.food_consumption_list_obj)[0], {
                is_delete: false,
            });
            if (!exists) {
                throw new common_1.BadRequestException('所耗食材不存在');
            }
        }
        const updatedData = Object.assign(Object.assign({}, dto), { set_state_user: new mongoose_2.Types.ObjectId(user.id) });
        if (hasProductTag) {
            updatedData.product_tags = new mongoose_2.Types.ObjectId(dto.product_tags);
        }
        if (hasProductNote) {
            updatedData.product_note = [...middle_data.product_note];
        }
        if (hasFoodConsumptionList) {
            updatedData.food_consumption_list = [
                ...middle_data.food_consumption_list,
            ];
        }
        await this.productListModel.findByIdAndUpdate(productId, updatedData);
    }
    async closeProduct(p_id, user) {
        const productId = new mongoose_2.Types.ObjectId(p_id);
        const targetProduct = await this.productListModel.findById(productId);
        if (!targetProduct) {
            throw new common_1.BadRequestException('目標商品不存在');
        }
        await this.productListModel.findByIdAndUpdate(productId, {
            is_delete: true,
            set_state_user: new mongoose_2.Types.ObjectId(user.id),
        });
    }
    async findEnableTags() {
        return this.productTagsModel
            .find({
            status: product_tags_1.ProductTagStatus.ENABLE,
        })
            .sort({ sort_no: 1 });
    }
    async findTags() {
        return this.productTagsModel.find().sort({ sort_no: 1 });
    }
    async findTag(id) {
        return this.productTagsModel.findById(id);
    }
    doCombineData(food_consumption_list, foodItemsObj) {
        const combineData = food_consumption_list.map((item) => {
            const targetId = item.id.toString();
            return Object.assign(Object.assign({}, item), foodItemsObj[targetId]);
        });
        return combineData;
    }
};
ManageProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_tags_1.ProductTags.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_list_1.ProductList.name)),
    __param(2, (0, mongoose_1.InjectModel)(food_item_1.FoodItem.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ManageProductService);
exports.ManageProductService = ManageProductService;
//# sourceMappingURL=manage-product.service.js.map