import { OmitProperties } from '@libs/common';
import { Auth } from '@libs/middleware/auth.guard';
import { TypedBody, TypedException, TypedParam, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';

import {
  CreateOneNewsData,
  CreateOneNewsException,
  CreateOneNewsPort,
  CreateOneNewsView,
} from './create-one-news';
import {
  UpdateOneNewsData,
  UpdateOneNewsException,
  UpdateOneNewsPort,
  UpdateOneNewsView,
} from './update-one-news';

@Controller('/news')
export class NewsController {
  constructor(
    private readonly createOneNewsPort: CreateOneNewsPort,
    private readonly updateOneNewsPort: UpdateOneNewsPort,
  ) {}

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

  /**
   * 소식 수정하기.
   * - 해당 소식의 작성자만 가능합니다.
   *
   * @tag News
   *
   * @param data 소식 수정에 필요한 정보
   *
   * @return 소식 id
   */
  @Auth('admin')
  @TypedException<UpdateOneNewsException>(400)
  @TypedRoute.Put('/:id')
  async updateOneNews(
    @TypedParam('id') id: number,
    @TypedBody() data: OmitProperties<UpdateOneNewsData, 'id'>,
  ): Promise<UpdateOneNewsView> {
    return this.updateOneNewsPort.execute({ id, ...data });
  }
}
