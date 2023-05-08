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
exports.ActivitiesSchema = exports.Activities = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Activities = class Activities {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Activities.prototype, "activities_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: 1,
        enum: ['0', '1'],
    }),
    __metadata("design:type", String)
], Activities.prototype, "discount_type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], Activities.prototype, "min_spend", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: 0,
        enum: ['0', '1'],
    }),
    __metadata("design:type", String)
], Activities.prototype, "charge_type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Activities.prototype, "is_period", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Activities.prototype, "start_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Activities.prototype, "end_time", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Activities.prototype, "create_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Activities.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Activities.prototype, "is_delete", void 0);
Activities = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: {
            createdAt: 'create_time',
        },
        versionKey: false,
    })
], Activities);
exports.Activities = Activities;
exports.ActivitiesSchema = mongoose_1.SchemaFactory.createForClass(Activities);
//# sourceMappingURL=activities.model.js.map