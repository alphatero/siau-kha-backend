/// <reference types="multer" />
import admin from 'firebase-admin';
export declare class ImageService {
    validateImageFile(file: Express.Multer.File): Promise<{
        errorState: boolean;
        errorMessage: string;
    }>;
    doFirebaseCredentialInitialize(): Promise<admin.app.App>;
    private isImageContent;
    private isJPG;
    private isJPEG;
    private isPNG;
}
