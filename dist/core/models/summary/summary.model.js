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
exports.SummarySchema = exports.Summary = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_1 = require("../user");
let Summary = class Summary {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], Summary.prototype, "cash", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], Summary.prototype, "other", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], Summary.prototype, "reserve_cash", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Summary.prototype, "create_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: 'User',
        required: true,
    }),
    __metadata("design:type", user_1.User)
], Summary.prototype, "create_user", void 0);
Summary = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: {
            createdAt: 'create_time',
        },
        versionKey: false,
    })
], Summary);
exports.Summary = Summary;
exports.SummarySchema = mongoose_1.SchemaFactory.createForClass(Summary);
//# sourceMappingURL=summary.model.js.map