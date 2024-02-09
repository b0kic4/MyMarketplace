import { CreateUserDto } from '@server/users/dto/create-user.dto';
import { UsersService } from '@server/users/users.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    registerUser(dto: CreateUserDto): Promise<{
        id: number;
        name: string;
        username: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(): Promise<void>;
}
