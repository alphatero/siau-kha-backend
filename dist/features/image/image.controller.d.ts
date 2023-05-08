/// <reference types="multer" />
import { ImageService } from './image.service';
import { Response } from 'express';
import { DeleteImageDto } from './dto/delete-image.dto';
export declare class ImageController {
    private readonly imageService;
    private firebaseApp;
    private config;
    private bucketName;
    constructor(imageService: ImageService);
    postUploadImage(file: Express.Multer.File, res: Response): Promise<void>;
    getImageList(): Promise<{
        fileUrls: any[];
    }>;
    deleteImage(body: DeleteImageDto): Promise<{
        message: string;
    }>;
}
