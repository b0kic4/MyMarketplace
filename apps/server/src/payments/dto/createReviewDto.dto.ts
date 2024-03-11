import { IsInt, IsNotEmpty, IsString, Min, Max } from 'class-validator';

export class CreateProductReviewDto {
  @IsNotEmpty()
  @IsInt()
  orderId: number;

  @IsNotEmpty()
  @IsInt()
  productId: number;

  @IsNotEmpty()
  @IsInt()
  cartProductId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsString()
  reviewContent: string;
}
