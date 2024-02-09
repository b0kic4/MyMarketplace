"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrpcRouter = void 0;
const common_1 = require("@nestjs/common");
const trpc_service_1 = require("./trpc.service");
const zod_1 = require("zod");
const trpcExpress = require("@trpc/server/adapters/express");
let TrpcRouter = class TrpcRouter {
    constructor(trpc) {
        this.trpc = trpc;
        this.appRouter = this.trpc.router({
            hello: this.trpc.procedure
                .input(zod_1.z.object({ name: zod_1.z.string().optional() }))
                .query(({ input }) => {
                return `Hello ${input.name ? input.name : 'Trpc'}!`;
            }),
        });
    }
    async applyMiddleware(app) {
        app.use(`/trpc`, trpcExpress.createExpressMiddleware({ router: this.appRouter }));
    }
};
exports.TrpcRouter = TrpcRouter;
exports.TrpcRouter = TrpcRouter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [trpc_service_1.TrpcService])
], TrpcRouter);
//# sourceMappingURL=trpc.router.js.map