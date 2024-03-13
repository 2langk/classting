import { Module } from '@nestjs/common';

import { CreateOneSchoolPort } from './create-one-school';
import { FindManySchoolPort } from './find-many-school';
import { SchoolController } from './school.controller';

@Module({
  controllers: [SchoolController],
  providers: [CreateOneSchoolPort, FindManySchoolPort],
})
export class SchoolModule {}
