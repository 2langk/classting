import { Module } from '@nestjs/common';

import { CreateOneNewsPort } from './create-one-news';
import { NewsController } from './news.controller';

@Module({
  controllers: [NewsController],
  providers: [CreateOneNewsPort],
})
export class NewsModule {}
