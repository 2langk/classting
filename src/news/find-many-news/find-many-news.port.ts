import { NewsRepository } from '@libs/infrastructure/repository';
import { Injectable } from '@nestjs/common';

import { FindManyNewsData, FindManyNewsView } from './find-many-news.type';

@Injectable()
export class FindManyNewsPort {
  constructor(private readonly newsRepository: NewsRepository) {}

  async execute(data: FindManyNewsData): Promise<FindManyNewsView> {
    const news = await this.newsRepository.findMany({
      schoolIds: data.schoolIds,
      cursor: { column: 'id', value: data.cursorId, op: 'lt' },
      pageSize: data.pageSize,
      orderBy: data.sort === 'recent' ? { id: 'desc' } : { id: 'asc' },
    });

    return {
      news,
    };
  }
}
