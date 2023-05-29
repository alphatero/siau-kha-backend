"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
let WSValidationPipe = class WSValidationPipe extends common_1.ValidationPipe {
    createExceptionFactory() {
        return (validationErrors = []) => {
            if (this.isDetailedOutputDisabled) {
                return new websockets_1.WsException('Bad request');
            }
            const errors = this.flattenValidationErrors(validationErrors);
            return new websockets_1.WsException(errors);
        };
    }
};
WSValidationPipe = __decorate([
    (0, common_1.Injectable)()
], WSValidationPipe);
exports.WSValidationPipe = WSValidationPipe;
//# sourceMappingURL=ws-validation.pipe.js.map