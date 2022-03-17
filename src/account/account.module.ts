import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
    imports: [SharedModule],
    providers: [AccountService],
    controllers: [AccountController]
})
export class AccountModule {}
