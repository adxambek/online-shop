//Product class
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class Product {
  @ApiProperty({
    type: "string",
    description: "Id of purchased product"
  })
  @IsString()
  @IsNotEmpty()
  product: string;

  @ApiProperty({
    type: Number,
    description: "Quantity of purchased product"
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class OrderDTO {
  @ApiProperty({
    type: String,
    description: "Owner id"
  })
  @IsString()
  @IsNotEmpty()
  owner: string;


  @ApiProperty({
    type: String,
    description: "Total price of purchased products"
  })
  @IsString()
  @IsNotEmpty()
  totalPrice: string;


  @ApiProperty({
    type: Product,
    description: "Purchased product"
  })
  @ValidateNested()
  @Type(() => Product)
  product: Product;
}