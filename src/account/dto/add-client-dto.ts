import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AddClientDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6, {
        message: 'Password must have at least 6 characters'
    })
    password: string;
}
