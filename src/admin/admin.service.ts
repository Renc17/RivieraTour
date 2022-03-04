import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthService } from 'src/shared/auth/auth.service';
import { LoginAdminDto } from './dto/login-admin-dto';

@Injectable()
export class AdminService {
    constructor(private authService: AuthService) {}

    async login(user: LoginAdminDto) {
        const validUser = await this.authService.validateCredentials(
            user.email,
            user.password
        );

        try {
            return {
                authToken: jwt.sign(
                    {
                        username: validUser.username,
                        id: validUser.id,
                        email: validUser.email
                    },
                    process.env.SECRET_TOKEN,
                    { expiresIn: '1 hour' }
                )
            };
        } catch (err: any) {
            return {
                error: {
                    statusCode: '500',
                    message: 'internal Server Error',
                    error: err.message
                }
            };
        }
    }
}
