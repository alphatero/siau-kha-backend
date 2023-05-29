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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const flatten = require("flat");
const bcrypt = require("bcrypt");
const user_1 = require("../../core/models/user");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(dto) {
        const { user_mima } = dto;
        const hash = await bcrypt.hash(user_mima, 12);
        return this.userModel.create(Object.assign(Object.assign({}, dto), { user_mima: hash }));
    }
    useExist(user_account) {
        return this.userModel.exists({ $or: [{ user_account }] });
    }
    updateUser(id, dto) {
        const obj = flatten(dto);
        return this.userModel.findByIdAndUpdate(id, { $set: obj }, { new: true });
    }
    updateUserSignInTime(id) {
        const lastSignInTime = new Date();
        return this.userModel.findByIdAndUpdate(id, {
            $set: { last_sign_in_time: lastSignInTime },
        });
    }
    async getUser(filters) {
        return this.userModel.findOne(filters).exec();
    }
    getUsers(filters) {
        const query = this.userModel.find(filters);
        return query.exec();
    }
    deleteUser(id) {
        return this.userModel.findByIdAndDelete(id).exec();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map