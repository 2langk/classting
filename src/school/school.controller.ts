import { Auth } from '@libs/middleware/auth.guard';
import { TypedBody, TypedException, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';

import {
  CreateOneSchoolData,
  CreateOneSchoolException,
  CreateOneSchoolPort,
  CreateOneSchoolView,
} from './create-one-school';
import {
  FindManySchoolData,
  FindManySchoolException,
  FindManySchoolPort,
  FindManySchoolView,
} from './find-many-school';

@Controller('/schools')
export class SchoolController {
  constructor(
    private readonly createOneSchoolPort: CreateOneSchoolPort,
    private readonly findManySchoolPort: FindManySchoolPort,
  ) {}

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

  /**
   * 학교 목록 조회하기.
   *
   * @tag School
   *
   * @param data 필터 & 페이지네이션 정보
   *
   * @return 학교 목록
   */
  @Auth('public')
  @TypedException<FindManySchoolException>(400)
  @TypedRoute.Get('/')
  async findManySchool(@TypedQuery() data: FindManySchoolData): Promise<FindManySchoolView> {
    return this.findManySchoolPort.execute(data);
  }
}
