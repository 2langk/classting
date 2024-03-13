import { SchoolAggregate, SubscriptionAggregate } from '@libs/domain';
import { ClsManager } from '@libs/infrastructure/manager';
import { SchoolRepository, SubscriptionRepository } from '@libs/infrastructure/repository';
import { Transaction } from '@libs/middleware/transaction.aspect';
import { Injectable } from '@nestjs/common';

import { CreateOneSchoolData, CreateOneSchoolView } from './create-one-school.type';

@Injectable()
export class CreateOneSchoolPort {
  constructor(
    private readonly clsManager: ClsManager,
    private readonly schoolRepository: SchoolRepository,
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  @Transaction()
  async execute(data: CreateOneSchoolData): Promise<CreateOneSchoolView> {
    const newSchoolId = await this.schoolRepository.saveOne(
      SchoolAggregate.create({
        id: 0,
        name: data.name,
        region: data.region,
      }),
    );

    await this.subscriptionRepository.saveOne(
      SubscriptionAggregate.create({
        id: 0,
        subscriptionStatus: [
          {
            id: 0,
            type: { admin: 'manage' },
            processedAt: new Date(),
          },
        ],
        schoolId: newSchoolId,
        userId: this.clsManager.getItem('currUser').userId,
      }),
    );

    return { id: newSchoolId };
  }
}
