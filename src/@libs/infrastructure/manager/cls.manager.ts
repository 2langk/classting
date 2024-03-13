import { UserRoleEnum } from '@libs/common';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ClsService } from 'nestjs-cls';

type AsyncStorageItem = {
  trx: Prisma.TransactionClient;
  currUser: {
    userId: number;
    userRole: UserRoleEnum;
  };
};

@Injectable()
export class ClsManager {
  constructor(private readonly clsService: ClsService) {}

  getItem<K extends keyof AsyncStorageItem, V extends AsyncStorageItem[K]>(key: K): V {
    return this.clsService.get(key);
  }

  setItem<K extends keyof AsyncStorageItem, V extends AsyncStorageItem[K]>(key: K, value: V): void {
    return this.clsService.set(key, value);
  }
}
