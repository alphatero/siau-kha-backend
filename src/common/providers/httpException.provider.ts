import { Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpFilter } from '../filters';

export const GLOBAL_HTTP_EXCEPTION: Provider = {
  provide: APP_FILTER,
  useClass: HttpFilter,
};
