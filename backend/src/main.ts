if (!process.env.IS_TS_NODE) {
  require('module-alias');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
}

bootstrap().then(() => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
