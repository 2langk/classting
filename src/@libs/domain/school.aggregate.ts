import { OmitProperties } from '@libs/common';

import { BaseAggregate, DateProperties } from './base.aggregate';

type SchoolProperties = OmitProperties<SchoolAggregate, keyof BaseAggregate<any>, 'methods'>;

export class SchoolAggregate extends BaseAggregate<'school'> {
  id!: number;
  name!: string;
  region!: string;

  static create(params: SchoolProperties, dates?: DateProperties) {
    const agg = new SchoolAggregate(params, dates);
    if (agg.id === 0) agg.pushDomainEvent('school_created');

    return agg;
  }
}
