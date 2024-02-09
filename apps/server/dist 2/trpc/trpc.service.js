"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrpcService = void 0;
const common_1 = require("@nestjs/common");
const server_1 = require("@trpc/server");
let TrpcService = class TrpcService {
    constructor() {
        this.trpc = server_1.initTRPC.create();
        this.procedure = this.trpc.procedure;
        this.router = this.trpc.router;
        this.mergeRouters = this.trpc.mergeRouters;
    }
};
exports.TrpcService = TrpcService;
exports.TrpcService = TrpcService = __decorate([
    (0, common_1.Injectable)()
], TrpcService);
//# sourceMappingURL=trpc.service.js.map