import { InfrastructureModule } from '@libs/infrastructure/infrastructure.module';
import { MiddlewareModule } from '@libs/middleware/middleware.module';
import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';

@Module({
  imports: [InfrastructureModule.forRoot(), MiddlewareModule.forRoot(), UserModule],
})
export class AppModule {}
