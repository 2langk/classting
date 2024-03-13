import { SubscribeAggregate } from '@libs/domain';
import { ClsManager } from '@libs/infrastructure/manager';
import { SubscribeRepository } from '@libs/infrastructure/repository';
import { Transaction } from '@libs/middleware/transaction.aspect';
import { Injectable } from '@nestjs/common';

import {
  UpsertOneSubscriptionData,
  UpsertOneSubsriptionView,
} from './upsert-one-subscription.type';

@Injectable()
export class UpsertOneSubscriptionPort {
  constructor(
    private readonly clsManager: ClsManager,
    private readonly subscribeRepository: SubscribeRepository,
  ) {}

  @Transaction()
  async execute(data: UpsertOneSubscriptionData): Promise<UpsertOneSubsriptionView> {
    const currUser = this.clsManager.getItem('currUser');

    const subscribe = (
      await this.subscribeRepository.findMany({
        schoolId: data.schoolId,
        userId: currUser.userId,
        pageSize: 1,
      })
    )[0];

    if (subscribe) {
      const recentSubscribeStatus = subscribe.subscribeStatus.at(-1);

      subscribe.subscribeStatus.push({
        id: 0,
        type:
          recentSubscribeStatus?.type.student === 'subscribe'
            ? { student: 'cancel' }
            : { student: 'subscribe' },
        processedAt: new Date(),
      });

      await this.subscribeRepository.saveOne(subscribe);

      return { id: subscribe.id };
    }

    const newSubscribeId = await this.subscribeRepository.saveOne(
      SubscribeAggregate.create({
        id: 0,
        schoolId: data.schoolId,
        userId: currUser.userId,
        subscribeStatus: [
          {
            id: 0,
            type: { student: 'subscribe' },
            processedAt: new Date(),
          },
        ],
      }),
    );

    return { id: newSubscribeId };
  }
}
