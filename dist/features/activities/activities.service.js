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
exports.ActivitiesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const activities_1 = require("../../core/models/activities");
let ActivitiesService = class ActivitiesService {
    constructor(ActivitiesModel) {
        this.ActivitiesModel = ActivitiesModel;
    }
    async createActivity(dto) {
        return this.ActivitiesModel.create(dto);
    }
    async getActivitiesList() {
        const query = await this.ActivitiesModel.find({
            status: true,
            is_delete: false,
        });
        const activities = query.map((doc) => {
            const activity = doc.toJSON();
            return {
                id: activity._id,
                activities_name: activity.activities_name,
                discount_type: activity.discount_type,
                charge_type: activity.charge_type,
                min_spend: activity.min_spend,
                discount: activity.discount,
                is_period: activity.is_period,
                start_time: activity.start_time,
                end_time: activity.end_time,
                act_products_list: activity.act_products_list,
            };
        });
        return { activities };
    }
};
ActivitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(activities_1.Activities.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ActivitiesService);
exports.ActivitiesService = ActivitiesService;
//# sourceMappingURL=activities.service.js.map