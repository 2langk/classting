import { environment } from '@libs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  SwaggerModule.setup('docs', app, require('../swagger.json'));

  await app.listen(4000);
}

bootstrap().then(() =>
  console.log(`[${environment.node.env.toLocaleUpperCase()}] Server is running on 4000`),
);
