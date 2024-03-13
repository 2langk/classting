import { UnwrapPromise } from '@libs/common';
import { NewsAggregate } from '@libs/domain';
import { Injectable } from '@nestjs/common';

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
