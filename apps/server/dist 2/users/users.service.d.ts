import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@server/prisma-service/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        name: string;
        username: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<import("@clerk/clerk-sdk-node").User[]>;
    findById(id: number): Promise<{
        id: number;
        name: string;
        username: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string, username: string): Promise<any>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
