import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class HttpFilter<T extends HttpException> implements ExceptionFilter<T> {
    catch(exception: T, host: ArgumentsHost): void;
}
