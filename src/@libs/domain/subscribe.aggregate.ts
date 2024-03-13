import { OmitProperties, SubscribeStatusEnum } from '@libs/common';

import { BaseAggregate, DateProperties } from './base.aggregate';

type SubscribeProperties = OmitProperties<SubscribeAggregate, keyof BaseAggregate<any>, 'methods'>;

export class SubscribeAggregate extends BaseAggregate<'subscribe'> {
  id!: number;
  subscribeStatus!: {
    id: number;
    type: SubscribeStatusEnum;
  };
  schoolId!: number;
  userId!: number;

  static create(params: SubscribeProperties, dates?: DateProperties) {
    const agg = new SubscribeAggregate(params, dates);
    if (agg.id === 0) agg.pushDomainEvent('subscribe_created');

    return agg;
  }
}
