import { SchoolRepository } from '@libs/infrastructure/repository';
import { Transaction } from '@libs/middleware/transaction.aspect';
import { Injectable } from '@nestjs/common';

import { FindManySchoolData, FindManySchoolView } from './find-many-school.type';

@Injectable()
export class FindManySchoolPort {
  constructor(private readonly schoolRepository: SchoolRepository) {}

  @Transaction()
  async execute(data: FindManySchoolData): Promise<FindManySchoolView> {
    const schools = await this.schoolRepository.findMany({
      cursorId: data.cursorId || Number.MAX_SAFE_INTEGER,
      cursorOp: 'lt',
      pageSize: data.pageSize,
      orderBy: { id: 'desc' },
    });

    return {
      schools,
    };
  }
}
