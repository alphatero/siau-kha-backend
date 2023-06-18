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
exports.FoodGroupSchema = exports.FoodGroup = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let FoodGroup = class FoodGroup {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FoodGroup.prototype, "group_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], FoodGroup.prototype, "is_delete", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], FoodGroup.prototype, "create_time", void 0);
FoodGroup = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: {
            createdAt: 'create_time',
        },
        versionKey: false,
    })
], FoodGroup);
exports.FoodGroup = FoodGroup;
const FoodGroupSchema = mongoose_1.SchemaFactory.createForClass(FoodGroup);
exports.FoodGroupSchema = FoodGroupSchema;
//# sourceMappingURL=food-group.model.js.map