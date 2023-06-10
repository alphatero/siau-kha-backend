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
exports.ManageActivitiesController = void 0;
const common_1 = require("@nestjs/common");
const manage_activities_service_1 = require("./manage-activities.service");
const dto_1 = require("./dto");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../../../common/guards");
const apiExample_1 = require("./apiExample");
const apiExample_2 = require("../../../common/utils/apiExample");
let ManageActivitiesController = class ManageActivitiesController {
    constructor(manageActivitiesService) {
        this.manageActivitiesService = manageActivitiesService;
    }
    getActivitiesList() {
        return this.manageActivitiesService.getActivitiesList(true);
    }
    async createActivities(dto) {
        await this.manageActivitiesService.createActivities(dto);
    }
    async updateActivities(actId, dto) {
        await this.manageActivitiesService.updateActivities(actId, dto);
    }
    async deleteActivities(actId) {
        await this.manageActivitiesService.deleteActivities(actId);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '取得所有活動' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_1.getActivitiesExample,
        },
    }),
    (0, common_1.Get)('/act-manage/acts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ManageActivitiesController.prototype, "getActivitiesList", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '新增活動' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_2.basicExample,
        },
    }),
    (0, common_1.Post)('/act-manage/act'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateManageActivityDto]),
    __metadata("design:returntype", Promise)
], ManageActivitiesController.prototype, "createActivities", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '修改活動內容' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_2.basicExample,
        },
    }),
    (0, common_1.Patch)('/act-manage/act/:actId'),
    __param(0, (0, common_1.Param)('actId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateManageActivityDto]),
    __metadata("design:returntype", Promise)
], ManageActivitiesController.prototype, "updateActivities", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '移除活動' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_2.basicExample,
        },
    }),
    (0, common_1.Delete)('/act-manage/act/:actId'),
    __param(0, (0, common_1.Param)('actId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ManageActivitiesController.prototype, "deleteActivities", null);
ManageActivitiesController = __decorate([
    (0, swagger_1.ApiTags)('ManageActivities'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guards_1.JwtGuard),
    (0, common_1.Controller)('manage'),
    __metadata("design:paramtypes", [manage_activities_service_1.ManageActivitiesService])
], ManageActivitiesController);
exports.ManageActivitiesController = ManageActivitiesController;
//# sourceMappingURL=manage-activities.controller.js.map