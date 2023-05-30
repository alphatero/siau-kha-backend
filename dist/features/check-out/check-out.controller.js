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
exports.CheckOutController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../../common/guards");
const apiExample_1 = require("../../common/utils/apiExample");
const apiExample_2 = require("./apiExample");
const check_out_service_1 = require("./check-out.service");
let CheckOutController = class CheckOutController {
    constructor(checkOutService) {
        this.checkOutService = checkOutService;
    }
    async getCheckOutInfo(id) {
        return this.checkOutService.getCheckOutInfo(id);
    }
    async checkOut(id, final_price) {
        return this.checkOutService.checkOut(id, final_price);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '取得此桌結帳資訊' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_2.getCheckOutInfoExample,
        },
    }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CheckOutController.prototype, "getCheckOutInfo", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '結帳' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_1.basicExample,
        },
    }),
    (0, common_1.Patch)('/:id/:final_price'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('final_price')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], CheckOutController.prototype, "checkOut", null);
CheckOutController = __decorate([
    (0, swagger_1.ApiTags)('Check-Out'),
    (0, common_1.UseGuards)(guards_1.JwtGuard),
    (0, common_1.Controller)('check-out'),
    __metadata("design:paramtypes", [check_out_service_1.CheckOutService])
], CheckOutController);
exports.CheckOutController = CheckOutController;
//# sourceMappingURL=check-out.controller.js.map