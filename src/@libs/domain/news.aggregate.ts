import { OmitProperties } from '@libs/common';

import { BaseAggregate, DateProperties } from './base.aggregate';

type NewsProperties = OmitProperties<NewsAggregate, keyof BaseAggregate<any>, 'methods'>;

export class NewsAggregate extends BaseAggregate<'news'> {
  id!: number;
  title!: string;
  contents!: string;
  schoolId!: number;
  adminId!: number;

  static create(params: NewsProperties, dates?: DateProperties) {
    const agg = new NewsAggregate(params, dates);
    if (agg.id === 0) agg.pushDomainEvent('news_created');

    return agg;
  }
}
