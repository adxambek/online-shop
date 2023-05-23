import { User } from "./user";
import { Product } from "./product";

interface ProductOrder {
  product: Product,
  quantity: number
}

export interface Order extends Document{
  owner: User,
  totalPrice: string,
  products: ProductOrder[]
}