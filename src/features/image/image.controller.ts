import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards';
// import { ImageMiddleware } from 'src/common/middleware';
import { ImageService } from './image.service';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import * as admin from 'firebase-admin';
import { DeleteImageDto } from './dto/delete-image.dto';

@ApiTags('Image')
@UseGuards(JwtGuard)
@Controller('image')
export class ImageController {
  private firebaseApp: admin.app.App;
  // 設定檔案的存取權限
  private config: any = {
    action: 'read',
    expires: '03-01-2500',
  };
  private bucketName = `${process.env.FIREBASE_PROJECT_ID}.appspot.com`;
  constructor(private readonly imageService: ImageService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '圖片上傳' })
  @ApiBody({
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
  })
  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async postUploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    // 檢查檔案格式及大小
    const validatedRes = await this.imageService.validateImageFile(file);

    if (validatedRes.errorState) {
      throw new BadRequestException(validatedRes.errorMessage);
    } else {
      // 確認 firebase app 是否存在，若不存在則初始化
      if (!this.firebaseApp) {
        this.firebaseApp =
          await this.imageService.doFirebaseCredentialInitialize();
      }

      // 建立 Storage 的 Bucket(儲存桶)
      const bucket = this.firebaseApp.storage().bucket(this.bucketName);

      // 建立檔案名稱
      const fileType = extname(file.originalname);
      const filename = `${uuidv4()}${fileType}`;

      // 基於檔案的原始名稱建立一個 blob 物件
      const blob = bucket.file(`images/${filename}`);

      // 建立一個可以寫入 blob 的物件
      const blobStream = blob.createWriteStream();

      // 如果上傳過程中發生錯誤，會觸發 error 事件
      blobStream.on('error', (err) => {
        console.log(err);
        throw new BadRequestException('上傳失敗');
      });

      // 監聽上傳狀態，當上傳完成時，會觸發 finish 事件
      blobStream.on('finish', () => {
        // 取得檔案的網址
        blob.getSignedUrl(this.config, (err, fileUrl) => {
          if (err) throw new BadRequestException('取得檔案網址失敗');
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

      // 將檔案的 buffer 寫入 blobStream
      blobStream.end(file.buffer);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '取得所有照片' })
  @Get('/getImageList')
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
      // 取得檔案的簽署 URL
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

  @ApiBearerAuth()
  @ApiOperation({ summary: '刪除指定照片' })
  @Delete('/deleteImage')
  // 此API作為開發用，後續正式上線時應該要移除
  async deleteImage(@Body() body: DeleteImageDto) {
    if (!this.firebaseApp) {
      this.firebaseApp =
        await this.imageService.doFirebaseCredentialInitialize();
    }
    const bucket = this.firebaseApp.storage().bucket(this.bucketName);

    // 取得檔案
    const file = bucket.file(body.image_name);
    const [exist] = await file.exists();
    if (!exist) {
      throw new BadRequestException(`目標檔案 ${body.image_name} 不存在`);
    } else {
      try {
        await file.delete();
        return {
          message: `成功刪除${body.image_name}`,
        };
      } catch (error) {
        throw new BadRequestException('刪除失敗');
      }
    }
  }
}
