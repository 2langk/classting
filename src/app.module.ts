import { InfrastructureModule } from '@libs/infrastructure/infrastructure.module';
import { MiddlewareModule } from '@libs/middleware/middleware.module';
import { Module } from '@nestjs/common';

import { SchoolModule } from './school/school.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [InfrastructureModule.forRoot(), MiddlewareModule.forRoot(), SchoolModule, UserModule],
})
export class AppModule {}
