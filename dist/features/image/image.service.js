"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const firebase_admin_1 = require("firebase-admin");
let ImageService = class ImageService {
    async validateImageFile(file) {
        const validatedRes = {
            errorState: false,
            errorMessage: '',
        };
        if (!file) {
            validatedRes.errorState = true;
            validatedRes.errorMessage = '未附上檔案';
        }
        else {
            const fileType = (0, path_1.extname)(file.originalname);
            if (!['.jpg', '.jpeg', '.png'].includes(fileType.toLowerCase())) {
                validatedRes.errorState = true;
                validatedRes.errorMessage = '上傳格式僅接受 jpg, jpeg, png';
            }
            const fileSize = file.size / 1024 / 1024;
            if (fileSize > 1) {
                validatedRes.errorState = true;
                validatedRes.errorMessage = '上傳大小超過 1MB';
            }
            const isImage = this.isImageContent(file.buffer);
            if (!isImage) {
                validatedRes.errorState = true;
                validatedRes.errorMessage =
                    '上傳檔案非圖片，內容可能已毀損或副檔名有誤，請重新檢查';
            }
        }
        return validatedRes;
    }
    async doFirebaseCredentialInitialize() {
        const config = {
            type: process.env.FIREBASE_TYPE,
            project_id: process.env.FIREBASE_PROJECT_ID,
            private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
            private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            client_email: process.env.FIREBASE_CLIENT_EMAIL,
            client_id: process.env.FIREBASE_CLIENT_ID,
            auth_uri: process.env.FIREBASE_AUTH_URI,
            token_uri: process.env.FIREBASE_TOKEN_URI,
            auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
            client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
        };
        const firebaseAdmin = firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(config),
            storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
        });
        return firebaseAdmin;
    }
    isImageContent(file) {
        const checkIsImageContent = [this.isJPG, this.isJPEG, this.isPNG];
        if (checkIsImageContent.some((isImage) => isImage(file))) {
            return true;
        }
        return false;
    }
    isJPG(arrayLike) {
        if (!arrayLike || arrayLike.length < 3) {
            return false;
        }
        return (arrayLike[0] === 0xff && arrayLike[1] === 0xd8 && arrayLike[2] === 0xff);
    }
    isJPEG(arrayLike) {
        if (!arrayLike || arrayLike.length < 4) {
            return false;
        }
        return (arrayLike[0] === 0xff &&
            arrayLike[1] === 0xd8 &&
            arrayLike[arrayLike.length - 2] === 0xff &&
            arrayLike[arrayLike.length - 1] === 0xd9 &&
            arrayLike[2] === 0x10);
    }
    isPNG(arrayLike) {
        if (!arrayLike || arrayLike.length < 8) {
            return false;
        }
        return (arrayLike[0] === 0x89 &&
            arrayLike[1] === 0x50 &&
            arrayLike[2] === 0x4e &&
            arrayLike[3] === 0x47 &&
            arrayLike[4] === 0x0d &&
            arrayLike[5] === 0x0a &&
            arrayLike[6] === 0x1a &&
            arrayLike[7] === 0x0a);
    }
};
ImageService = __decorate([
    (0, common_1.Injectable)()
], ImageService);
exports.ImageService = ImageService;
//# sourceMappingURL=image.service.js.map