import { InfrastructureModule } from '@libs/infrastructure/infrastructure.module';
import { MiddlewareModule } from '@libs/middleware/middleware.module';
import { Module } from '@nestjs/common';

import { NewsModule } from './news/news.module';
import { SchoolModule } from './school/school.module';
import { SubscriptionModule } from './subscribe/subscription.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    InfrastructureModule.forRoot(),
    MiddlewareModule.forRoot(),
    NewsModule,
    SchoolModule,
    SubscriptionModule,
    UserModule,
  ],
})
export class AppModule {}
