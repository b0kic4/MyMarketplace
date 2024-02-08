import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcRouter } from './trpc/trpc.router';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'error', 'warn'],
  });
  app.enableCors();

  // validation pipes for passing data through requests and responses
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);
  await app.listen(3001);
}
bootstrap();
