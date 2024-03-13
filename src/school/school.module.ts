import { Module } from '@nestjs/common';

import { CreateOneSchoolPort } from './create-one-school';
import { SchoolController } from './school.controller';

@Module({
  controllers: [SchoolController],
  providers: [CreateOneSchoolPort],
})
export class SchoolModule {}
