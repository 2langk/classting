import { ClsManager } from '@libs/infrastructure/manager';
import { NewsRepository } from '@libs/infrastructure/repository';
import { Transaction } from '@libs/middleware/transaction.aspect';
import { Injectable } from '@nestjs/common';

import {
  DeleteOneNewsData,
  DeleteOneNewsException,
  DeleteOneNewsView,
} from './delete-one-news.type';

@Injectable()
export class DeleteOneNewsPort {
  constructor(
    private readonly clsManager: ClsManager,
    private readonly newsRepository: NewsRepository,
  ) {}

  @Transaction()
  async execute(data: DeleteOneNewsData): Promise<DeleteOneNewsView> {
    const news = await this.newsRepository.findOneById(data.id);
    if (!news) {
      throw new DeleteOneNewsException('news notfound.');
    }

    const currUser = this.clsManager.getItem('currUser');
    if (news.adminId !== currUser.userId) {
      throw new DeleteOneNewsException('permission denied.');
    }

    await this.newsRepository.deleteByIds(news.id);

    return { id: news.id };
  }
}
