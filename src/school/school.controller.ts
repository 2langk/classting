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

  @Auth('admin')
  @TypedException<CreateOneSchoolException>(400)
  @TypedRoute.Post('/')
  async createOneSchool(@TypedBody() data: CreateOneSchoolData): Promise<CreateOneSchoolView> {
    return this.createOneSchoolPort.execute(data);
  }
}
