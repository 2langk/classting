import { InfrastructureModule } from '@libs/infrastructure/infrastructure.module';
import { MiddlewareModule } from '@libs/middleware/middleware.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [InfrastructureModule.forRoot(), MiddlewareModule.forRoot()],
})
export class AppModule {}
