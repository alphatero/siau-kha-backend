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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodItemSchema = exports.FoodItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_1 = require("../user");
const food_item_type_1 = require("./food-item.type");
let FoodItem = class FoodItem {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FoodItem.prototype, "food_items_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.Types.ObjectId],
        ref: 'FoodGroup',
    }),
    __metadata("design:type", String)
], FoodItem.prototype, "group", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], FoodItem.prototype, "purchase_cost", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], FoodItem.prototype, "item_stock", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], FoodItem.prototype, "safety_stock", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: '0',
        enum: Object.values(food_item_type_1.FoodItemsStatus),
    }),
    __metadata("design:type", String)
], FoodItem.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: '斤',
    }),
    __metadata("design:type", String)
], FoodItem.prototype, "units", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], FoodItem.prototype, "create_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: 'User',
        required: true,
    }),
    __metadata("design:type", user_1.User)
], FoodItem.prototype, "create_user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], FoodItem.prototype, "is_delete", void 0);
FoodItem = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: {
            createdAt: 'create_time',
        },
        versionKey: false,
    })
], FoodItem);
exports.FoodItem = FoodItem;
const FoodItemSchema = mongoose_1.SchemaFactory.createForClass(FoodItem);
exports.FoodItemSchema = FoodItemSchema;
FoodItemSchema.pre(/^find/, function (next) {
    this.populate('group');
    next();
});
//# sourceMappingURL=food-item.model.js.map