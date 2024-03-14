import { Module } from '@nestjs/common';

import { CreateOneNewsPort } from './create-one-news';
import { DeleteOneNewsPort } from './delete-one-news';
import { FindManyNewsPort } from './find-many-news';
import { NewsController } from './news.controller';
import { UpdateOneNewsPort } from './update-one-news';

@Module({
  controllers: [NewsController],
  providers: [CreateOneNewsPort, UpdateOneNewsPort, DeleteOneNewsPort, FindManyNewsPort],
})
export class NewsModule {}
