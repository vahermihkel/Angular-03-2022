import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../models/cart-product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  parcelMachines: any[] = []; // muutuja, kuhu panen väärtused pärast API päringut ja mida
  // kuvan HTML-s
  selectedParcelMachine: any;

  constructor(private http: HttpClient,
    private productService: ProductService) { } // API päringute tegemiseks 

  ngOnInit(): void {
    const cartItemsSS = sessionStorage.getItem("cartItems");
    if (cartItemsSS) {
      // if-i vaja, sest kui ta hakkas tühjusest jutumärke ära võtma, sai errori
      this.cartProducts = JSON.parse(cartItemsSS); 
    }
    //  get === võtmise päring
    //  <any[]> --- tüüp mida päringu järgselt kätte saadakse
    // .subscribe --- viib päringu läbi, teeb asünkroonkseks (lubab koodil edasi minna)
    // res --- kuhu tuleb tagastus
    // res => .....  --- funktsioon mis käivitub koheselt kui res kätte saadakse
    this.http.get<any[]>("https://www.omniva.ee/locations.json").subscribe(res => 
        this.parcelMachines = res);
    
    // JSON.parse ei pea tegema, sest ta tuleb stringina ja ta peabki olema string
    //    if-i pole vaja, sest kui ta on tühjus, pannakse selectedParcelMachine sisse tühjus
    this.selectedParcelMachine = sessionStorage.getItem("parcelMachine");
  }

  onDecreaseQuantity(cartProduct: CartProduct) {
    cartProduct.quantity--;
    if (cartProduct.quantity <= 0) {
      this.onRemoveProduct(cartProduct);
    }
    sessionStorage.setItem("cartItems", JSON.stringify(this.cartProducts));
    this.productService.cartChanged.next(true);
  }

  onIncreaseQuantity(cartProduct: CartProduct) {
    cartProduct.quantity++;
    sessionStorage.setItem("cartItems", JSON.stringify(this.cartProducts));
    this.productService.cartChanged.next(true);
  }

  onRemoveProduct(cartProduct: CartProduct) {
              // this.cartProducts.indexOf(cartProduct);
    const index = this.cartProducts.findIndex(element => element.product.id === cartProduct.product.id);
    if (index >= 0) {
      this.cartProducts.splice(index,1);
      if (this.cartProducts.length === 1 && this.cartProducts[0].product.id === 11110000) {
        this.onUnselectParcelMachine();
      }
      sessionStorage.setItem("cartItems", JSON.stringify(this.cartProducts));
      this.productService.cartChanged.next(true);
    }
  }

  onParcelMachineSelected() {
                // JSON.stringify() ei pea panema, sest juba on stringi kujul
                //   "Elva postkontor"
    sessionStorage.setItem("parcelMachine", this.selectedParcelMachine);
    this.cartProducts.push({
        product: {id: 11110000,name:"Pakiautomaadi tasu",price:3.5,imgSrc: "assets/locker.png",category: "",description: "",isActive: true},
        quantity: 1
      });
    sessionStorage.setItem("cartItems", JSON.stringify(this.cartProducts));
    this.productService.cartChanged.next(true);
    this.calculateSumOfCart();
  }

  // ISESEISVALT: ostukorvi kogusumma
  // kui võtate hinna, siis peab olema element.product.price
  // korrutada läbi ka kogusega

  // MAKSMINE

  // TÜHJENDA NUPP

  // *ngIf'ga ära kustutamine kui on 0 toodet 
  // MAKSMISE NUPP ja TÜHJENDA NUPP

  onUnselectParcelMachine() {
    this.selectedParcelMachine = "";
    sessionStorage.removeItem("parcelMachine");
    this.onRemoveProduct({
      product: {id: 11110000,name:"Pakiautomaadi tasu",price:3.5,imgSrc: "assets/locker.png",category: "",description: "",isActive: true},
      quantity: 1
    })
  }

  calculateSumOfCart() {
    // TODO:
  }
}
