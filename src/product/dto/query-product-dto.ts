import { ApiProperty } from "@nestjs/swagger";

export class QueryProductDTO {
  @ApiProperty({
    type: String,
    description: "To search products by title",
    required: false
  })
  search: string;

  @ApiProperty({
    type: Number,
    description: "Current page",
    required: false
  })
  page: number

  @ApiProperty({
    type: Number,
    description: "Limit",
    required: false
  })
  limit: number;
}