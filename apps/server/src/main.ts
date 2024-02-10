import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcRouter } from './trpc/trpc.router';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(express.json({ limit: '50mb' }));

  // Enable CORS
  app.enableCors();

  // Use global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Set up tRPC router
  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);

  // Start the application
  await app.listen(4000);
}

bootstrap();
