import { Module } from '@nestjs/common';

import { SubscriptionController } from './subscription.controller';
import { UpsertOneSubscriptionPort } from './upsert-one-subscription';

@Module({
  controllers: [SubscriptionController],
  providers: [UpsertOneSubscriptionPort],
})
export class SubscriptionModule {}
