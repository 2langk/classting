import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import * as ManagerMap from './manager';
import * as RepositoryMap from './repository';

@Module({})
export class InfrastructureModule {
  static forRoot(): DynamicModule {
    const providers: Provider[] = [...Object.values(ManagerMap), ...Object.values(RepositoryMap)];

    return {
      module: InfrastructureModule,
      imports: [
        ClsModule.forRoot({
          middleware: { mount: true },
        }),
      ],
      providers,
      exports: providers,
      global: true,
    };
  }
}
