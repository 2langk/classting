import { ClsManager } from '@libs/infrastructure/manager';
import { NewsRepository } from '@libs/infrastructure/repository';
import { Transaction } from '@libs/middleware/transaction.aspect';
import { Injectable } from '@nestjs/common';

import {
  UpdateOneNewsData,
  UpdateOneNewsException,
  UpdateOneNewsView,
} from './update-one-news.type';

@Injectable()
export class UpdateOneNewsPort {
  constructor(
    private readonly clsManager: ClsManager,
    private readonly newsRepository: NewsRepository,
  ) {}

  @Transaction()
  async execute(data: UpdateOneNewsData): Promise<UpdateOneNewsView> {
    const news = await this.newsRepository.findOneById(data.id);
    if (!news) {
      throw new UpdateOneNewsException('news notfound.');
    }

    const currUser = this.clsManager.getItem('currUser');
    if (news.adminId !== currUser.userId) {
      throw new UpdateOneNewsException('permission denied.');
    }

    news.update({
      title: data.title,
      contents: data.contents,
    });

    await this.newsRepository.saveOne(news);

    return { id: news.id };
  }
}
