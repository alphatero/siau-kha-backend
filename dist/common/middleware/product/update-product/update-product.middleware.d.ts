import { NestMiddleware } from '@nestjs/common';
export declare class UpdateProductMiddleware implements NestMiddleware {
    use(req: any, _: any, next: () => void): void;
}
