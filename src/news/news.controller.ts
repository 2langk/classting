import { Auth } from '@libs/middleware/auth.guard';
import { TypedBody, TypedException, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';

import {
  CreateOneNewsData,
  CreateOneNewsException,
  CreateOneNewsPort,
  CreateOneNewsView,
} from './create-one-news';

@Controller('/news')
export class NewsController {
  constructor(private readonly createOneNewsPort: CreateOneNewsPort) {}

  /**
   * 소식 생성하기.
   * - 해당 학교의 관리자만 가능합니다.
   *
   * @tag News
   *
   * @param data 소식 생성에 필요한 정보
   *
   * @return 소식 id
   */
  @Auth('admin')
  @TypedException<CreateOneNewsException>(400)
  @TypedRoute.Post('/')
  async createOneNews(@TypedBody() data: CreateOneNewsData): Promise<CreateOneNewsView> {
    return this.createOneNewsPort.execute(data);
  }
}
