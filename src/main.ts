import { environment } from '@libs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap().then(() => console.log(`[${environment.node.env}] Server is running on 3000`));
