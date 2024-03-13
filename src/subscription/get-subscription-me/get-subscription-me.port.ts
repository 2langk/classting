import { ClsManager } from '@libs/infrastructure/manager';
import { SubscriptionRepository } from '@libs/infrastructure/repository';
import { Injectable } from '@nestjs/common';

import { GetSubscriptionMeView } from './get-subscription-me.type';

@Injectable()
export class GetSubscriptionMePort {
  constructor(
    private readonly clsManager: ClsManager,
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(): Promise<GetSubscriptionMeView> {
    const currUser = this.clsManager.getItem('currUser');

    const subscriptions = await this.subscriptionRepository.findMany({
      userId: currUser.userId,
      pageSize: 100,
    });

    return {
      schoolIds: subscriptions
        .filter((each) => each.subscriptionStatus.at(-1)?.type.student === 'subscribe')
        .map((each) => each.schoolId),
    };
  }
}
