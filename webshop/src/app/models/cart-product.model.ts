import { Product } from "./product.model";

export class CartProduct {
    constructor(
       public product: Product,
       public quantity: number
    ) {}
}

//let cartItems: {product: Product, quantity: number}[] = [];
//let cartItems: CartProduct[] = [];

