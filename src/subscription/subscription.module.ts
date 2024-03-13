import { Module } from '@nestjs/common';

import { GetSubscriptionMePort } from './get-subscription-me';
import { SubscriptionController } from './subscription.controller';
import { UpsertOneSubscriptionPort } from './upsert-one-subscription';

@Module({
  controllers: [SubscriptionController],
  providers: [UpsertOneSubscriptionPort, GetSubscriptionMePort],
})
export class SubscriptionModule {}
