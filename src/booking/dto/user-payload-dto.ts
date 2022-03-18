import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class UserPaylodDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    customerId: string;
}
