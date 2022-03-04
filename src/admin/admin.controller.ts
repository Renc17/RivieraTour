import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Put,
    Req,
    Res,
    UseGuards
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginAdminDto } from './dto/login-admin-dto';
import { Response } from 'express';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { ChangePasswordDto } from './dto/change-password-dto';

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

    @UseGuards(AuthGuard)
    @Put('password')
    async changePassword(
        @Req() req: any,
        @Res() res: Response,
        @Body() body: ChangePasswordDto
    ) {
        const status = this.adminService.changePassword(
            req.user,
            body.password
        );

        if (!status) {
            return res.status(HttpStatus.BAD_REQUEST).send();
        }

        return res.status(HttpStatus.OK).send();
    }
}
