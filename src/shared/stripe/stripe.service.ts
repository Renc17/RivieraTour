import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
    private stripe: Stripe = new Stripe(this.configService.get('STRIPE_SK'), {
        apiVersion: '2020-08-27'
    });

    constructor(private configService: ConfigService) {}

    public async charge(amount: number) {
        return await this.stripe.paymentIntents.create({
            amount,
            currency: this.configService.get('STRIPE_CURRENCY'),
            payment_method_types: ['card'],
            payment_method: 'pm_card_visa'
        });
    }

    async hook(req: any) {
        const endpointSecret =
            'whsec_58ed';
        const sig = req.headers['stripe-signature'];

        let event;

        try {
            event = await this.stripe.webhooks.constructEvent(
                req.body,
                sig,
                endpointSecret
            );
        } catch (err) {
            return {
                message: err.message
            };
        }

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                // Then define and call a function to handle the event payment_intent.succeeded
                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    }
}
