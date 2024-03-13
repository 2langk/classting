import { OmitProperties, UserRoleEnum } from '@libs/common';

import { BaseAggregate, DateProperties } from './base.aggregate';

type UserProperties = OmitProperties<UserAggregate, keyof BaseAggregate<any>, 'methods'>;

export class UserAggregate extends BaseAggregate<'user'> {
  id!: number;
  email!: string;
  password!: string;
  name!: string;
  userRole!: {
    id: number;
    type: UserRoleEnum;
  };

  static create(params: UserProperties, dates?: DateProperties) {
    const agg = new UserAggregate(params, dates);
    if (agg.id === 0) agg.pushDomainEvent('user_created');

    return agg;
  }
}
