import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartProduct } from 'src/app/models/cart-product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-parcel-machines',
  templateUrl: './parcel-machines.component.html',
  styleUrls: ['./parcel-machines.component.css']
})
export class ParcelMachinesComponent implements OnInit {
  parcelMachines: any[] = []; // muutuja, kuhu panen väärtused pärast API päringut ja mida
  // kuvan HTML-s
  selectedParcelMachine: any;
  @Input() cartProducts: CartProduct[] = []; // andmed sisse
  @Output() calculateSumEvent: EventEmitter<any> = new EventEmitter();      // funktsioonid välja
  @Output() removeParcelMachineEvent: EventEmitter<CartProduct> = new EventEmitter();      // funktsioonid välja

  constructor(private http: HttpClient,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.http.get<any[]>("https://www.omniva.ee/locations.json").subscribe(res => 
        this.parcelMachines = res);
    
    // JSON.parse ei pea tegema, sest ta tuleb stringina ja ta peabki olema string
    //    if-i pole vaja, sest kui ta on tühjus, pannakse selectedParcelMachine sisse tühjus
    this.selectedParcelMachine = sessionStorage.getItem("parcelMachine");
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
    // this.calculateSumOfCart();
    this.calculateSumEvent.emit();
  }

  onUnselectParcelMachine() {
    this.selectedParcelMachine = "";
    sessionStorage.removeItem("parcelMachine");
    this.removeParcelMachineEvent.emit({
      product: {id: 11110000,name:"Pakiautomaadi tasu",price:3.5,imgSrc: "assets/locker.png",category: "",description: "",isActive: true},
      quantity: 1
    });
    // this.onRemoveProduct({
    //   product: {id: 11110000,name:"Pakiautomaadi tasu",price:3.5,imgSrc: "assets/locker.png",category: "",description: "",isActive: true},
    //   quantity: 1
    // })
  }

}
