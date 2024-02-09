"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myClerk = exports.clerkConfig = void 0;
const backend_1 = require("@clerk/backend");
exports.clerkConfig = {
    secreyKey: process.env.CLERK_SECRET_KEY,
};
exports.myClerk = (0, backend_1.Clerk)({ secretKey: exports.clerkConfig.secreyKey });
//# sourceMappingURL=clerk.config.js.map