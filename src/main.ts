import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap().then(() =>
  console.log(
    `[${process.env['NODE_ENV']?.toLocaleUpperCase()}] Server is running on 3000`,
  ),
);
