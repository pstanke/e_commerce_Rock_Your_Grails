import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { CreateOrderedProductDTO } from './create-ordered-product.dto';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsNotEmpty()
  orderedProducts: CreateOrderedProductDTO[];
}
