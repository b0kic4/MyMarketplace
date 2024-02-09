"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const trpc_router_1 = require("./trpc/trpc.router");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['log', 'debug', 'error', 'warn'],
        cors: true,
    });
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const trpc = app.get(trpc_router_1.TrpcRouter);
    trpc.applyMiddleware(app);
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map