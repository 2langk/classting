import { UnwrapPromise } from '@libs/common';
import { SchoolAggregate } from '@libs/domain';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ClsManager } from '../manager';
import { BaseRepository } from './base.repository';

@Injectable()
export class SchoolRepository extends BaseRepository<SchoolAggregate> {
  constructor(protected override readonly clsManager: ClsManager) {
    super();
  }

  protected override includeAll = {}; // satisfies Prisma.schoolInclude;

  protected override entity() {
    return this.queryRunner('school').findFirst({
      // include: this.includeAll,
    });
  }

  protected override convertToAgg(entity: UnwrapPromise<ReturnType<typeof this.entity>>) {
    if (!entity) return null;

    return SchoolAggregate.create(
      {
        id: entity.id,
        name: entity.name,
        region: entity.region,
      },
      {
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
    );
  }

  async findOneById(id: number): Promise<SchoolAggregate | null> {
    return this.queryRunner('school')
      .findFirst({
        where: { id },
        // include: this.includeAll
      })
      .then(this.convertToAgg);
  }

  async findMany(params: {
    cursorId: number;
    cursorOp: 'gt' | 'lt';
    pageSize: number;
    orderBy: Prisma.schoolOrderByWithRelationInput;
  }): Promise<SchoolAggregate[]> {
    return this.queryRunner('school')
      .findMany({
        where: {
          id: this.wrapCondition(params.cursorId, params.cursorOp),
        },
        take: params.pageSize,
        orderBy: params.orderBy,
        // include: this.includeAll,
      })
      .then((schools) => schools.map(this.convertToAgg) as SchoolAggregate[]);
  }

  async saveOne(agg: SchoolAggregate): Promise<number> {
    if (agg.id !== 0) {
      await this.queryRunner('school').deleteMany({
        where: { id: agg.id },
      });
    }

    const entity = await this.queryRunner('school').create({
      data: {
        id: this.wrapPk(agg.id),
        name: agg.name,
        region: agg.region,
        createdAt: agg.createdAt,
        updatedAt: agg.updatedAt,
      },
    });

    await this.publishDomainEvent(agg, entity.id);

    return entity.id;
  }
}
