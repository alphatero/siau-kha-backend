import { DynamicModule, Module, Provider } from '@nestjs/common';
import { IAuthorizationOptions } from './models/option.model';
import { CASBIN_ENFOECER } from './constants/token.const';
import { newEnforcer } from 'casbin';

import { AuthorizationService } from './authorization.service';

@Module({})
export class AuthorizationModule {
  static register(options: IAuthorizationOptions): DynamicModule {
    const { modelPath, policyAdapter, global } = options;
    const enforcerProvider: Provider = {
      provide: CASBIN_ENFOECER,
      useFactory: async () => {
        const instance = await newEnforcer(modelPath, policyAdapter);
        return instance;
      },
    };

    return {
      global: global,
      module: AuthorizationModule,
      providers: [enforcerProvider, AuthorizationService],
      exports: [AuthorizationService],
    };
  }
}
