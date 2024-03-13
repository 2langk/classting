import { AggreagteEnum, DomainEventEnum, UnwrapArray } from '@libs/common';

export type DateProperties = Pick<BaseAggregate<any>, 'createdAt' | 'updatedAt'>;

export abstract class BaseAggregate<T extends AggreagteEnum> {
  createdAt!: Date;
  updatedAt!: Date;
  domainEvents!: Extract<DomainEventEnum, `${T}_${string}`>[];

  protected constructor(params: unknown, dates?: DateProperties) {
    Object.assign(this, params);
    this.createdAt = dates?.createdAt || this.createdAt || new Date();
    this.updatedAt = dates?.updatedAt || this.updatedAt || new Date();
    this.domainEvents = [];
  }

  protected pushDomainEvent(eventName: UnwrapArray<typeof this.domainEvents>) {
    this.domainEvents.push(eventName);
  }
}
