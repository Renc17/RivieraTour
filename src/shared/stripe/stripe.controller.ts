import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
    constructor(private stripeService: StripeService) {}

    @Post('paymenthook')
    async paymentStatus(@Req() req: any, @Res() res: Response) {
        const response = await this.stripeService.hook(req);
        if (response) {
            res.status(400).send(`Webhook Error: ${response.message}`);
        }
    }
}
