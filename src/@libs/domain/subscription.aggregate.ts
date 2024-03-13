import { OmitProperties, SubscriptionStatusEnum } from '@libs/common';

import { BaseAggregate, DateProperties } from './base.aggregate';

type SubscriptionProperties = OmitProperties<
  SubscriptionAggregate,
  keyof BaseAggregate<any>,
  'methods'
>;

export class SubscriptionAggregate extends BaseAggregate<'subscription'> {
  id!: number;
  subscriptionStatus!: {
    id: number;
    type: SubscriptionStatusEnum;
    processedAt: Date;
  }[];
  schoolId!: number;
  userId!: number;

  static create(params: SubscriptionProperties, dates?: DateProperties) {
    const agg = new SubscriptionAggregate(params, dates);
    if (agg.id === 0) agg.pushDomainEvent('subscription_created');

    return agg;
  }
}
