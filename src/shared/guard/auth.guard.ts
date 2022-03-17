import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as jwt from 'jsonwebtoken';
import { SECRET_TOKEN } from 'config';
import { Role } from './enums/role.enum';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}

    canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    private verifyToken(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, SECRET_TOKEN, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    }

    private async validateRequest(request: any) {
        if (!request.headers.authorization) {
            throw new HttpException('No token provided', 401);
        }

        const [prefix, authToken] = request.headers.authorization.split(' ');

        if (prefix !== 'Bearer') {
            throw new HttpException('Token is not a Bearer', 401);
        }

        const user = await this.verifyToken(authToken).catch((err) => {
            throw new HttpException(err, 401);
        });

        console.log(user);

        if (user.role != Role.ADMIN) {
            throw new HttpException('Access Forbidden', HttpStatus.FORBIDDEN);
        }

        const found = await this.prisma.admin.findUnique({
            where: {
                id: user.id
            }
        });

        if (!found) {
            throw new HttpException('Admin Not Found', 404);
        }

        request.user = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        return true;
    }
}
