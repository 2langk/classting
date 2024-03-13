import { SubscriptionAggregate } from '@libs/domain';
import { ClsManager } from '@libs/infrastructure/manager';
import { SubscriptionRepository } from '@libs/infrastructure/repository';
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
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  @Transaction()
  async execute(data: UpsertOneSubscriptionData): Promise<UpsertOneSubsriptionView> {
    const currUser = this.clsManager.getItem('currUser');

    const subscription = (
      await this.subscriptionRepository.findMany({
        schoolId: data.schoolId,
        userId: currUser.userId,
        pageSize: 1,
      })
    )[0];

    if (subscription) {
      const recentStatus = subscription.subscriptionStatus.at(-1);

      subscription.subscriptionStatus.push({
        id: 0,
        type:
          recentStatus?.type.student === 'subscribe'
            ? { student: 'cancel' }
            : { student: 'subscribe' },
        processedAt: new Date(),
      });

      await this.subscriptionRepository.saveOne(subscription);

      return { id: subscription.id };
    }

    const newSubscriptionId = await this.subscriptionRepository.saveOne(
      SubscriptionAggregate.create({
        id: 0,
        schoolId: data.schoolId,
        userId: currUser.userId,
        subscriptionStatus: [
          {
            id: 0,
            type: { student: 'subscribe' },
            processedAt: new Date(),
          },
        ],
      }),
    );

    return { id: newSubscriptionId };
  }
}
