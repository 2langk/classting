import { Auth } from '@libs/middleware/auth.guard';
import { TypedBody, TypedException, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';

import {
  CreateOneSchoolData,
  CreateOneSchoolException,
  CreateOneSchoolPort,
  CreateOneSchoolView,
} from './create-one-school';

@Controller('/schools')
export class SchoolController {
  constructor(private readonly createOneSchoolPort: CreateOneSchoolPort) {}

  /**
   * 학교 생성하기.
   * - 관리자(admin) 유저만 가능합니다.
   *
   * @tag School
   *
   * @param data 학교 생성에 필요한 정보
   *
   * @return 학교 id
   */
  @Auth('admin')
  @TypedException<CreateOneSchoolException>(400)
  @TypedRoute.Post('/')
  async createOneSchool(@TypedBody() data: CreateOneSchoolData): Promise<CreateOneSchoolView> {
    return this.createOneSchoolPort.execute(data);
  }
}
