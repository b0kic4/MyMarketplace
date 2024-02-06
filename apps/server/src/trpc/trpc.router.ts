import { Injectable, INestApplication } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { NestApplication } from '@nestjs/core';

// what are injectables?
// what is the difference between NestApplicaton and injectable NestApplication

@Injectable()

// treat this like controllers
// do not add all the logic to the controllers
// delecate to services
// import for example Hello service, and in that service there is some logic
// and instead of returning `Hello input name or something, you can atually call the service
// and that is the nests best practice for the full stack development
export class TrpcRouter {
  constructor(private readonly trpc: TrpcService) {}
  appRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(z.object({ name: z.string().optional() }))
      .query(({ input }) => {
        return `Hello ${input.name ? input.name : 'Trpc'}!`;
      }),
  });
  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
