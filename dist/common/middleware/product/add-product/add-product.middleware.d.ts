import { NestMiddleware } from '@nestjs/common';
export declare class AddProductMiddleware implements NestMiddleware {
    use(req: any, _: any, next: () => void): void;
}
