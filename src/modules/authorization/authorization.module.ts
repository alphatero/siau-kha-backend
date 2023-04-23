import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AuthorizationOptions } from './models/option.model';
import { CASBIN_ENFOECER } from './constants/token.const';
import { newEnforcer } from 'casbin';

import { AuthorizationService } from './authorization.service';

@Module({})
export class AuthorizationModule {
  static register(options: AuthorizationOptions): DynamicModule {
    const { modelPath, policyAdapter, isGlobal } = options;
    const enforcerProvider: Provider = {
      provide: CASBIN_ENFOECER,
      useFactory: async () => {
        const engorcer = await newEnforcer(modelPath, policyAdapter);
        return engorcer;
      },
    };

    return {
      global: isGlobal,
      module: AuthorizationModule,
      providers: [enforcerProvider, AuthorizationService],
      exports: [AuthorizationService],
    };
  }
}
