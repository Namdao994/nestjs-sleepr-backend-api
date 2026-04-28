import { IsDefined, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateChargeDto {

  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;

  @IsNumber()
  amount: number
}