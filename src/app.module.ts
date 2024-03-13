import { InfrastructureModule } from '@libs/infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [InfrastructureModule.forRoot()],
})
export class AppModule {}
