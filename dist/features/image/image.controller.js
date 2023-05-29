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
exports.ImageController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../../common/guards");
const image_service_1 = require("./image.service");
const path_1 = require("path");
const uuid_1 = require("uuid");
const delete_image_dto_1 = require("./dto/delete-image.dto");
let ImageController = class ImageController {
    constructor(imageService) {
        this.imageService = imageService;
        this.config = {
            action: 'read',
            expires: '03-01-2500',
        };
        this.bucketName = `${process.env.FIREBASE_PROJECT_ID}.appspot.com`;
    }
    async postUploadImage(file, res) {
        const validatedRes = await this.imageService.validateImageFile(file);
        if (validatedRes.errorState) {
            throw new common_1.BadRequestException(validatedRes.errorMessage);
        }
        else {
            if (!this.firebaseApp) {
                this.firebaseApp =
                    await this.imageService.doFirebaseCredentialInitialize();
            }
            const bucket = this.firebaseApp.storage().bucket(this.bucketName);
            const fileType = (0, path_1.extname)(file.originalname);
            const filename = `${(0, uuid_1.v4)()}${fileType}`;
            const blob = bucket.file(`images/${filename}`);
            const blobStream = blob.createWriteStream();
            blobStream.on('error', (err) => {
                console.log(err);
                throw new common_1.BadRequestException('上傳失敗');
            });
            blobStream.on('finish', () => {
                blob.getSignedUrl(this.config, (err, fileUrl) => {
                    if (err)
                        throw new common_1.BadRequestException('取得檔案網址失敗');
                    res.send({
                        status: 'success',
                        message: '成功',
                        data: {
                            image_name: `images/${filename}`,
                            image_url: fileUrl,
                        },
                    });
                });
            });
            blobStream.end(file.buffer);
        }
    }
    async getImageList() {
        if (!this.firebaseApp) {
            this.firebaseApp =
                await this.imageService.doFirebaseCredentialInitialize();
        }
        const bucket = this.firebaseApp.storage().bucket(this.bucketName);
        const [files] = await bucket.getFiles({
            prefix: 'images/',
        });
        const fileUrls = [];
        for (const file of files) {
            const [fileUrl] = await file.getSignedUrl(this.config);
            fileUrls.push({
                image_name: file.name,
                image_url: fileUrl,
            });
        }
        return {
            fileUrls,
        };
    }
    async deleteImage(body) {
        if (!this.firebaseApp) {
            this.firebaseApp =
                await this.imageService.doFirebaseCredentialInitialize();
        }
        const bucket = this.firebaseApp.storage().bucket(this.bucketName);
        const file = bucket.file(body.image_name);
        const [exist] = await file.exists();
        if (!exist) {
            throw new common_1.BadRequestException(`目標檔案 ${body.image_name} 不存在`);
        }
        else {
            try {
                await file.delete();
                return {
                    message: `成功刪除${body.image_name}`,
                };
            }
            catch (error) {
                throw new common_1.BadRequestException('刪除失敗');
            }
        }
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '圖片上傳' }),
    (0, swagger_1.ApiBody)({
        schema: {
            default: 'multipart/form-data',
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.Post)('/upload'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "postUploadImage", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '取得所有照片' }),
    (0, common_1.Get)('/getImageList'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "getImageList", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '刪除指定照片' }),
    (0, common_1.Delete)('/deleteImage'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_image_dto_1.DeleteImageDto]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "deleteImage", null);
ImageController = __decorate([
    (0, swagger_1.ApiTags)('Image'),
    (0, common_1.UseGuards)(guards_1.JwtGuard),
    (0, common_1.Controller)('image'),
    __metadata("design:paramtypes", [image_service_1.ImageService])
], ImageController);
exports.ImageController = ImageController;
//# sourceMappingURL=image.controller.js.map