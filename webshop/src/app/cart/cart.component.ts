import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: any[] = [];

  constructor() { }

  ngOnInit(): void {
    const cartItemsSS = sessionStorage.getItem("cartItems");
    if (cartItemsSS) {
      this.cartProducts = JSON.parse(cartItemsSS); 
    }
  }

  onDecreaseQuantity(cartProduct: any) {
    cartProduct.quantity--;
    if (cartProduct.quantity <= 0) {
      this.onRemoveProduct(cartProduct);
    }
    sessionStorage.setItem("cartItems", JSON.stringify(this.cartProducts));
  }

  onIncreaseQuantity(cartProduct: any) {
    cartProduct.quantity++;
    sessionStorage.setItem("cartItems", JSON.stringify(this.cartProducts));
  }

  onRemoveProduct(cartProduct: any) {
              // this.cartProducts.indexOf(cartProduct);
    const index = this.cartProducts.findIndex(element => element.product.id === cartProduct.product.id);
    if (index >= 0) {
      this.cartProducts.splice(index,1);
      sessionStorage.setItem("cartItems", JSON.stringify(this.cartProducts));
    }
  }

  // ISESEISVALT: ostukorvi kogusumma
  // kui võtate hinna, siis peab olema element.product.price
  // korrutada läbi ka kogusega

  // MAKSMINE

  // TÜHJENDA NUPP

  // *ngIf'ga ära kustutamine kui on 0 toodet 
  // MAKSMISE NUPP ja TÜHJENDA NUPP

}
