import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        name: string;
        username: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<import("@clerk/backend").User[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        username: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
