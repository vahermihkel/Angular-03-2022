import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CartProduct } from '../models/cart-product.model';
import { ProductService } from '../services/product.service';
import { ParcelMachinesComponent } from './parcel-machines/parcel-machines.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  sumOfCart = 0;
  @ViewChild(ParcelMachinesComponent) parcelMachinesComponent!: ParcelMachinesComponent;

  constructor(private productService: ProductService) { } // API päringute tegemiseks 

  ngOnInit(): void {
    const cartItemsSS = sessionStorage.getItem("cartItems");
    if (cartItemsSS) {
      // if-i vaja, sest kui ta hakkas tühjusest jutumärke ära võtma, sai errori
      this.cartProducts = JSON.parse(cartItemsSS); 
    }
    this.calculateSumOfCart();
    //  get === võtmise päring
    //  <any[]> --- tüüp mida päringu järgselt kätte saadakse
    // .subscribe --- viib päringu läbi, teeb asünkroonkseks (lubab koodil edasi minna)
    // res --- kuhu tuleb tagastus
    // res => .....  --- funktsioon mis käivitub koheselt kui res kätte saadakse
  }

  onDecreaseQuantity(cartProduct: CartProduct) {
    cartProduct.quantity--;
    if (cartProduct.quantity <= 0) {
      this.onRemoveProduct(cartProduct);
    }
    sessionStorage.setItem("cartItems", JSON.stringify(this.cartProducts));
    this.productService.cartChanged.next(true);
    this.calculateSumOfCart();
  }

  onIncreaseQuantity(cartProduct: CartProduct) {
    cartProduct.quantity++;
    sessionStorage.setItem("cartItems", JSON.stringify(this.cartProducts));
    this.productService.cartChanged.next(true);
    this.calculateSumOfCart();
  }

  onRemoveProduct(cartProduct: CartProduct) {
              // this.cartProducts.indexOf(cartProduct);
    const index = this.cartProducts.findIndex(element => element.product.id === cartProduct.product.id);
    if (index >= 0) {
      this.cartProducts.splice(index,1);
      if (this.cartProducts.length === 1 && this.cartProducts[0].product.id === 11110000) {
        this.parcelMachinesComponent.onUnselectParcelMachine();
      }
      sessionStorage.setItem("cartItems", JSON.stringify(this.cartProducts));
      this.productService.cartChanged.next(true);
    }
    this.calculateSumOfCart();
  }

  

  // ISESEISVALT: ostukorvi kogusumma
  // kui võtate hinna, siis peab olema element.product.price
  // korrutada läbi ka kogusega

  // MAKSMINE

  // TÜHJENDA NUPP

  // *ngIf'ga ära kustutamine kui on 0 toodet 
  // MAKSMISE NUPP ja TÜHJENDA NUPP

  onEmptyCart() {
    this.cartProducts = [];
    sessionStorage.setItem("cartItems", JSON.stringify(this.cartProducts));
    this.productService.cartChanged.next(true);
    this.calculateSumOfCart();
  }

  calculateSumOfCart() {
    this.sumOfCart = 0;
    this.cartProducts.forEach(element => this.sumOfCart += element.product.price * element.quantity);
  }
}
