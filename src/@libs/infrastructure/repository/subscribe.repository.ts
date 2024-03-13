import { UnwrapPromise } from '@libs/common';
import { SubscribeAggregate } from '@libs/domain';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ClsManager } from '../manager';
import { BaseRepository } from './base.repository';

@Injectable()
export class SubscribeRepository extends BaseRepository<SubscribeAggregate> {
  constructor(protected override readonly clsManager: ClsManager) {
    super();
  }

  protected override includeAll = {
    subscribe_status: { include: { config: true } },
  } satisfies Prisma.subscribeInclude;

  protected override entity() {
    return this.queryRunner('subscribe').findFirst({
      include: this.includeAll,
    });
  }

  protected override convertToAgg(entity: UnwrapPromise<ReturnType<typeof this.entity>>) {
    if (!entity || !entity.subscribe_status) return null;

    return SubscribeAggregate.create(
      {
        id: entity.id,
        subscribeStatus: entity.subscribe_status.map((each) => {
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

  async findOneById(id: number): Promise<SubscribeAggregate | null> {
    return this.queryRunner('subscribe')
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
  }): Promise<SubscribeAggregate[]> {
    return this.queryRunner('subscribe')
      .findMany({
        where: {
          user_id: this.wrapCondition(params.userId, 'in'),
          school_id: this.wrapCondition(params.schoolId, 'in'),
        },
        take: params.pageSize,
        include: this.includeAll,
      })
      .then(
        (subscribes) => subscribes.map((each) => this.convertToAgg(each)) as SubscribeAggregate[],
      );
  }

  async saveOne(agg: SubscribeAggregate): Promise<number> {
    if (agg.id !== 0) {
      await this.queryRunner('subscribe_status').deleteMany({
        where: { subscribe_id: agg.id },
      });

      await this.queryRunner('subscribe').deleteMany({
        where: { id: agg.id },
      });
    }

    const entity = await this.queryRunner('subscribe').create({
      data: {
        id: this.wrapPk(agg.id),
        school_id: agg.schoolId,
        user_id: agg.userId,
        subscribe_status: {
          createMany: {
            data: agg.subscribeStatus.map((each) => ({
              id: each.id,
              config_id: this.configMap.getId(
                'subscribe_status',
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
