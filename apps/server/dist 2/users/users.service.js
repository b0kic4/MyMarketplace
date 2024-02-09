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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma-service/prisma.service");
const bcrypt_1 = require("bcrypt");
const clerk_config_1 = require("../clerk.config");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    email: createUserDto.email,
                },
            });
            if (user) {
                throw new common_1.ConflictException('User with this email already exists');
            }
            const newUser = await this.prisma.user.create({
                data: Object.assign(Object.assign({}, createUserDto), { password: await (0, bcrypt_1.hash)(createUserDto.password, 10) }),
            });
            const { password } = newUser, result = __rest(newUser, ["password"]);
            return result;
        }
        catch (error) {
            console.error('Prisma Error:', error);
            throw new Error('Internal Server Error');
        }
    }
    async findAll() {
        const userList = await clerk_config_1.myClerk.users.getUserList();
        return userList;
    }
    async findById(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: id },
            });
            if (!user)
                throw new common_1.ConflictException('User does not exists');
            return user;
        }
        catch (error) {
            console.log(error);
            throw new Error('Internal Server Error');
        }
    }
    async findByEmail(email, username) {
        console.log('this is console log for the route - findByEmail');
        if (email && !username)
            return await this.prisma.user.findFirst({
                where: {
                    email: email,
                },
            });
        if (!email && username)
            return await this.prisma.user.findFirst({
                where: {
                    username: username,
                },
            });
        return await this.prisma.user.findFirst({
            where: {
                username: username,
                email: email,
            },
        });
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map