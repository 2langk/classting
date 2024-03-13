import { BaseRepository } from '@libs/infrastructure/repository/base.repository';
import { Aspect, createDecorator, LazyDecorator, WrapParams } from '@toss/nestjs-aop';

import { ClsManager } from '../infrastructure/manager';

const TransactionSymbol = Symbol('Transaction');

@Aspect(TransactionSymbol)
export class TransactionAspect implements LazyDecorator {
  constructor(private readonly clsManager: ClsManager) {}

  wrap(params: WrapParams<any, boolean>) {
    const { method, metadata } = params;

    return (...params: any[]) => {
      if (!metadata) {
        return method(...params);
      }

      return BaseRepository._prismaClient.$transaction(async (trx) => {
        this.clsManager.setItem('trx', trx);
        return method(...params);
      });
    };
  }
}

export const Transaction = (useTrx = true) => createDecorator(TransactionSymbol, useTrx);
