import { PrismaService } from '@server/prisma-service/prisma.service';
import { UsersService } from '@server/users/users.service';
export declare class AuthService {
    private prisma;
    private userService;
    constructor(prisma: PrismaService, userService: UsersService);
    login(): Promise<any>;
}
