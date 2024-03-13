import { UnwrapPromise } from '@libs/common';
import { SubscriptionAggregate } from '@libs/domain';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ClsManager } from '../manager';
import { BaseRepository } from './base.repository';

@Injectable()
export class SubscriptionRepository extends BaseRepository<SubscriptionAggregate> {
  constructor(protected override readonly clsManager: ClsManager) {
    super();
  }

  protected override includeAll = {
    subscription_status: { include: { config: true } },
  } satisfies Prisma.subscriptionInclude;

  protected override entity() {
    return this.queryRunner('subscription').findFirst({
      include: this.includeAll,
    });
  }

  protected override convertToAgg(entity: UnwrapPromise<ReturnType<typeof this.entity>>) {
    if (!entity || !entity.subscription_status) return null;

    return SubscriptionAggregate.create(
      {
        id: entity.id,
        subscriptionStatus: entity.subscription_status.map((each) => {
          const parentName = this.configMap.getById(each.config.parent_id || 0).name;

          return {
            id: each.id,
            type: {
              [parentName]: each.config.name,
            },
            processedAt: each.processedAt,
          };
        }),
        schoolId: entity.school_id,
        userId: entity.user_id,
      },
      {
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
    );
  }

  async findOneById(id: number): Promise<SubscriptionAggregate | null> {
    return this.queryRunner('subscription')
      .findFirst({
        where: { id },
        include: this.includeAll,
      })
      .then(this.convertToAgg);
  }

  async findMany(params: {
    userId?: number | number[];
    schoolId?: number | number[];
    pageSize: number;
  }): Promise<SubscriptionAggregate[]> {
    return this.queryRunner('subscription')
      .findMany({
        where: {
          user_id: this.wrapCondition(params.userId, 'in'),
          school_id: this.wrapCondition(params.schoolId, 'in'),
        },
        take: params.pageSize,
        include: this.includeAll,
      })
      .then(
        (subscriptions) =>
          subscriptions.map((each) => this.convertToAgg(each)) as SubscriptionAggregate[],
      );
  }

  async saveOne(agg: SubscriptionAggregate): Promise<number> {
    if (agg.id !== 0) {
      await this.queryRunner('subscription_status').deleteMany({
        where: { subscription_id: agg.id },
      });

      await this.queryRunner('subscription').deleteMany({
        where: { id: agg.id },
      });
    }

    const entity = await this.queryRunner('subscription').create({
      data: {
        id: this.wrapPk(agg.id),
        school_id: agg.schoolId,
        user_id: agg.userId,
        subscription_status: {
          createMany: {
            data: agg.subscriptionStatus.map((each) => ({
              id: each.id,
              config_id: this.configMap.getId(
                'subscription_status',
                each.type.admin || each.type.student || '',
              ),
              processedAt: each.processedAt,
            })),
          },
        },
        createdAt: agg.createdAt,
        updatedAt: agg.updatedAt,
      },
    });

    await this.publishDomainEvent(agg, entity.id);

    return entity.id;
  }
}
