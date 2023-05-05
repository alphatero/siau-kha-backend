import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import admin from 'firebase-admin';

@Injectable()
export class ImageService {
  public async validateImageFile(file: Express.Multer.File) {
    const validatedRes = {
      errorState: false,
      errorMessage: '',
    };
    if (!file) {
      validatedRes.errorState = true;
      validatedRes.errorMessage = '未附上檔案';
    } else {
      // 檢查檔案格式
      const fileType = extname(file.originalname);
      if (!['.jpg', '.jpeg', '.png'].includes(fileType.toLowerCase())) {
        validatedRes.errorState = true;
        validatedRes.errorMessage = '上傳格式僅接受 jpg, jpeg, png';
      }

      // 檢查檔案大小
      const fileSize = file.size / 1024 / 1024; // convert to MB
      if (fileSize > 1) {
        validatedRes.errorState = true;
        validatedRes.errorMessage = '上傳大小超過 1MB';
      }

      // 從檔案內容判斷是否為圖片
      const isImage = this.isImageContent(file.buffer);
      if (!isImage) {
        validatedRes.errorState = true;
        validatedRes.errorMessage =
          '上傳檔案非圖片，內容可能已毀損或副檔名有誤，請重新檢查';
      }
    }

    return validatedRes;
  }

  public async doFirebaseCredentialInitialize() {
    const config: any = {
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    };

    const firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(config),
      storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
    });

    return firebaseAdmin;
  }

  private isImageContent(file) {
    const checkIsImageContent = [this.isJPG, this.isJPEG, this.isPNG];
    if (checkIsImageContent.some((isImage) => isImage(file))) {
      return true;
    }
    return false;
  }

  private isJPG(arrayLike) {
    if (!arrayLike || arrayLike.length < 3) {
      return false;
    }

    return (
      arrayLike[0] === 0xff && arrayLike[1] === 0xd8 && arrayLike[2] === 0xff
    );
  }

  private isJPEG(arrayLike) {
    if (!arrayLike || arrayLike.length < 4) {
      return false;
    }

    return (
      arrayLike[0] === 0xff &&
      arrayLike[1] === 0xd8 &&
      arrayLike[arrayLike.length - 2] === 0xff &&
      arrayLike[arrayLike.length - 1] === 0xd9 &&
      arrayLike[2] === 0x10 // SOF0 marker
    );
  }

  private isPNG(arrayLike) {
    if (!arrayLike || arrayLike.length < 8) {
      return false;
    }

    return (
      arrayLike[0] === 0x89 &&
      arrayLike[1] === 0x50 &&
      arrayLike[2] === 0x4e &&
      arrayLike[3] === 0x47 &&
      arrayLike[4] === 0x0d &&
      arrayLike[5] === 0x0a &&
      arrayLike[6] === 0x1a &&
      arrayLike[7] === 0x0a
    );
  }
}
