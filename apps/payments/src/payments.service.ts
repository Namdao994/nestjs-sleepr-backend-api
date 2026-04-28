import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentMethodCreateParams } from 'node_modules/stripe/cjs/resources/PaymentMethods';
import Stripe, { Stripe as StripeType } from 'stripe';
import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe: StripeType;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY')!,
      {
        apiVersion: '2026-04-22.dahlia',
      },
    );
  }

  async createCharge({ amount }: CreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      confirm: true,
      currency: 'usd',
      payment_method: 'pm_card_visa',
      // payment_method: paymentMethodId,
      // payment_method_types: ['card'],
    })

    return paymentIntent;
  }
}

