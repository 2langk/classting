import { NewsAggregate } from '@libs/domain';
import { ClsManager } from '@libs/infrastructure/manager';
import {
  NewsRepository,
  SubscribeRepository,
  UserRepository,
} from '@libs/infrastructure/repository';
import { Transaction } from '@libs/middleware/transaction.aspect';
import { Injectable } from '@nestjs/common';

import {
  CreateOneNewsData,
  CreateOneNewsException,
  CreateOneNewsView,
} from './create-one-news.type';

@Injectable()
export class CreateOneNewsPort {
  constructor(
    private readonly clsManager: ClsManager,
    private readonly userRepository: UserRepository,
    private readonly subscribeRepository: SubscribeRepository,
    private readonly newsRepository: NewsRepository,
  ) {}

  @Transaction()
  async execute(data: CreateOneNewsData): Promise<CreateOneNewsView> {
    const user = await this.userRepository.findOneById(this.clsManager.getItem('currUser').userId);
    if (!user || user.userRole.type !== 'admin') {
      throw new CreateOneNewsException('permission denied.');
    }

    const subscribe = (
      await this.subscribeRepository.findMany({
        userId: user.id,
        schoolId: data.schoolId,
        pageSize: 1,
      })
    )[0];
    if (!subscribe?.subscribeStatus.map((each) => each.type.admin).includes('manage')) {
      throw new CreateOneNewsException('permission denied.');
    }

    const newNewsId = await this.newsRepository.saveOne(
      NewsAggregate.create({
        id: 0,
        title: data.title,
        contents: data.contents,
        schoolId: data.schoolId,
        adminId: user.id,
      }),
    );

    return { id: newNewsId };
  }
}
