import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginAdminDto } from './dto/login-admin-dto';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Post('login')
    async login(@Body() credentials: LoginAdminDto, @Res() res: Response) {
        const response = await this.adminService.login(credentials);

        if (response.error) {
            return res.status(HttpStatus.BAD_GATEWAY).send(response.error);
        }

        return res.status(HttpStatus.OK).send(response);
    }
}
