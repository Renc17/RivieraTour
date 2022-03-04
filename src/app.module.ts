import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [AdminModule, SharedModule],
    controllers: [],
    providers: []
})
export class AppModule {}
