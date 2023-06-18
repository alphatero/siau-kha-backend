# siau-kha-backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

# 專案：燒角 - 燒烤店 POS 系統

 **燒角** 是一款專為燒烤店設計的 POS 系統專案。該專案後端使用 [NestJS](https://nestjs.com/) 框架與 [MongoDB](https://www.mongodb.com/)。


## 專案團隊


| 開發人員 | 負責開發範圍                           |
| -------- | -------------------------------------- |
| 羔羊     | 後端開發  |
| yuyu     | 前端開發/後端開發   |
| eddie    | 前端開發/後端開發         |
| alpha    | 前端開發 |
| 鉛筆     | 前端開發     |


---
## 環境要求

本專案開發於 Node.js 環境。請使用 **Node.js v18.16.0 版本** 進行開發與執行。


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
---
## Environment Variables


```env
# MongoDB 連接設定

# MongoDB 使用者名稱
MONGO_USERNAME=

# MongoDB 使用者密碼
MONGO_PASSWORD=

# MongoDB 資源名稱
MONGO_RESOURCE=


# JWT（JSON Web Token）設定
# JWT 的加密密鑰
JWT_SECRET=

# 本地測試設定
# 本地伺服器的埠號
PORT=

# 客戶端測試的埠號
CLIENT_TEST_PORT=

# 部署網域設定

# 正式前端網域名稱
FRONTEND_DOMAIN=

# 預發布（PR）前端網域名稱
PR_FRONTEND_DOMAIN=

# 自定義前端網域名稱
CUSTOM_FRONTEND_DOMAIN=

# Socket 連接埠設定
# 訂單商品詳情的 Socket 連接埠
ORDER_PRODUCT_DETAILS_PORT=

# Firebase 設定
# Firebase 服務的類型
FIREBASE_TYPE=

# Firebase 專案 ID
FIREBASE_PROJECT_ID=

# Firebase 私鑰 ID
FIREBASE_PRIVATE_KEY_ID=

# Firebase 私鑰
FIREBASE_PRIVATE_KEY=

# Firebase 客戶端 Email
FIREBASE_CLIENT_EMAIL=

# Firebase 客戶端 ID
FIREBASE_CLIENT_ID=

# Firebase 授權 URI
FIREBASE_AUTH_URI=

# Firebase 權杖 URI
FIREBASE_TOKEN_URI=

# Firebase 授權提供者的 X.509 證書 URL
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=

# Firebase 客戶端的 X.509 證書 URL
FIREBASE_CLIENT_X509_CERT_URL=
...
```
## 資料夾說明

| 資料夾/檔案 | 說明 |
| --- | --- |
| `src/common` | 存放通用的工具類別和方法 |
| `src/configs` | 存放應用程式的配置檔案 |
| `src/core` | 存放應用程式的核心模組，例如應用程式的主模組 |
| `src/features` | 存放應用程式的具體功能模組，例如用戶、訂單等 |

在每個功能模組中，通常會包含以下幾個檔案：

- `module.ts`: 定義該模組的模組類別和相關配置。
- `controller.ts`: 定義該模組的控制器類別，用於處理 HTTP 請求。
- `service.ts`: 定義該模組的服務類別，用於處理具體的業務邏輯。

### `src/common`

`src/common` 資料夾通常存放通用的工具類別和方法，這些工具通常可以被整個應用程式使用，例如日誌工具、加密工具、驗證工具等。

### `src/configs`

常存放應用程式的配置檔案，例如環境配置、資料庫配置、日誌配置等。這些配置通常是針對不同環境的，例如開發環境、測試環境、生產環境等。

### `src/core`

通常存放應用程式的核心模組，例如應用程式的主模組。應用程式的主模組通常負責整合不同的模組，並且啟動應用程式。此外，`src/core` 資料夾中還可以存放一些通用的模組，例如資料庫模組、驗證模組等。

### `src/features`

通常存放應用程式的具體功能模組，例如用戶、訂單等。每個功能模組通常包含一個模組類別、一個或多個控制器類別、一個或多個服務類別、以及一些資

---

## 專案技術摘要

該專案主要使用以下的技術和套件：

### 主要技術框架與庫

- **[NestJS](https://nestjs.com/)**: 這是我們的主要後端框架。NestJS 利用 TypeScript 提供的強大特性，並提供一個模組化和可測試的開發架構，使我們能以更好的方式組織我們的代碼。我們使用了許多與 NestJS 相關的套件，例如 `@nestjs/common`, `@nestjs/core`, `@nestjs/jwt` 等。

- **[Mongoose](https://mongoosejs.com/)**: 我們使用 Mongoose 來處理 MongoDB 數據庫的交互。

- **[Passport](http://www.passportjs.org/)**: 這個套件用於處理身份驗證。我們利用 `passport-local` 來處理本地策略的身份驗證，並且利用 `passport-jwt` 來處理 JWT（JSON Web Tokens）。

- **[Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)**: 用於管理 Firebase 服務，如 Firestore, Firebase Storage, Firebase Authentication 等。

- **[Socket.IO](https://socket.io/)**: 我們使用此庫實現實時的雙向通信。

### 開發工具

- **[TypeScript](https://www.typescriptlang.org/)**: JavaScript 的一種超集，它增加了靜態類型檢查和一些其他功能，以提高開發效率和代碼可維護性。

- **[ESLint](https://eslint.org/)**: 用於實施 JavaScript 和 TypeScript 的代碼風格和規範。

- **[Jest](https://jestjs.io/)**: 用於進行單元測試。

- **[Prettier](https://prettier.io/)**: 用於自動格式化代碼，確保團隊的代碼風格一致。


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
