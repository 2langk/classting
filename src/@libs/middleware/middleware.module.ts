import { DynamicModule, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AopModule } from '@toss/nestjs-aop';
import { AllExceptionFilter } from './all-exception.filter';
import { AuthGuard } from './auth.guard';
import { TransactionAspect } from './transaction.aspect';

@Module({})
export class MiddlewareModule {
  static forRoot(): DynamicModule {
    return {
      module: MiddlewareModule,
      imports: [AopModule],
      providers: [
        TransactionAspect,
        {
          provide: APP_FILTER,
          useClass: AllExceptionFilter,
        },
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
      ],
    };
  }
}
