import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // automatically transform payloads to be objects typed according to their DTO classes
      whitelist: true, // strip properties that do not have any decorators
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
