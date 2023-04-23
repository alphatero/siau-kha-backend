import { Provider, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

export const GLOBAL_VALIDATION_PIPE: Provider = {
  provide: APP_PIPE,
  useFactory: () => {
    return new ValidationPipe({
      transform: true,
      whitelist: true,
    });
  },
};
