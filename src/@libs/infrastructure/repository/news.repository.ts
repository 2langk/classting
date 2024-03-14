import { UnwrapPromise } from '@libs/common';
import { NewsAggregate } from '@libs/domain';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ClsManager } from '../manager';
import { BaseRepository } from './base.repository';

@Injectable()
export class NewsRepository extends BaseRepository<NewsAggregate> {
  constructor(protected override readonly clsManager: ClsManager) {
    super();
  }

  protected override includeAll = {}; // satisfies Prisma.news

  protected override entity() {
    return this.queryRunner('news').findFirst({
      // include: this.includeAll,
    });
  }

  protected override convertToAgg(entity: UnwrapPromise<ReturnType<typeof this.entity>>) {
    if (!entity) return null;

    return NewsAggregate.create(
      {
        id: entity.id,
        title: entity.title,
        contents: entity.contents,
        adminId: entity.admin_id,
        schoolId: entity.school_id,
      },
      {
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
    );
  }

  async findOneById(id: number): Promise<NewsAggregate | null> {
    return this.queryRunner('news')
      .findFirst({
        where: { id },
        // include: this.includeAll,
      })
      .then(this.convertToAgg);
  }

  async findMany(params: {
    // filter
    schoolIds?: number[] | undefined;
    // pagination
    cursor: {
      column: Prisma.NewsScalarFieldEnum;
      value: string | number | Date | undefined;
      op: 'lt' | 'gt';
    };
    pageSize: number;
    orderBy: Prisma.newsOrderByWithRelationInput;
  }): Promise<NewsAggregate[]> {
    return this.queryRunner('news')
      .findMany({
        where: {
          AND: [
            { [params.cursor.column]: this.wrapCondition(params.cursor.value, params.cursor.op) },
            { school_id: this.wrapCondition(params.schoolIds, 'in') },
          ],
        },
        take: params.pageSize,
        orderBy: params.orderBy,
        // include: this.includeAll,
      })
      .then((news) => news.map(this.convertToAgg) as NewsAggregate[]);
  }

  async saveOne(agg: NewsAggregate): Promise<number> {
    if (agg.id !== 0) {
      await this.deleteByIds(agg.id);
    }

    const entity = await this.queryRunner('news').create({
      data: {
        id: this.wrapPk(agg.id),
        title: agg.title,
        contents: agg.contents,
        school_id: agg.schoolId,
        admin_id: agg.adminId,
        createdAt: agg.createdAt,
        updatedAt: agg.updatedAt,
      },
    });

    await this.publishDomainEvent(agg, entity.id);

    return entity.id;
  }

  async deleteByIds(id: number | number[]) {
    await this.queryRunner('news').deleteMany({
      where: { id: this.wrapCondition(id, 'in') },
    });
  }
}
