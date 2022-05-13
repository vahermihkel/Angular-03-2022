import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../models/cart-product.model';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/300`);
  images = [
    "https://picsum.photos/id/312/900/300",
    "https://picsum.photos/id/944/900/300",
    "https://picsum.photos/id/1011/900/300",
    "https://picsum.photos/id/931/900/300"
  ];

  // 1. *ngFor
  // 2. objektid {url: "https://", header: "", text: "", alt: ""}
  // 3. HTML-s src={{image.url}}

  products: Product[] = [];
  dbUrl = "https://webshop-03-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  categories: string[] = [];
  selectedCategory = "";
  originalProducts: Product[] = [];

  // kuup2ev = new Date();
  // protsent = 0.5;
  // rahayhik = 1000000;
  // lause = "vitamin well without sugar";

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductsFromDb().subscribe(response => {   // .subscribe lubab edasi minna
        //  {-asdasd: {1}, -aqeqe, {2}}      [{1},{2}]   ---> forin tsükkel   (teeb objekti sees tsükli)
                    // const toode = {nimi: "Coca cola", hind: 3, kategooria: "coca", aktiivne: true}
                    // const newArray = [];
                    // for (const key in toode)    1. nimi   2. hind    3. kategooria    4. aktiivne
                    //   toode[key]    1. "Coca cola"   2. 3   3. "coca"   4. true
                    // forin sees:    newArray.push(toode[key])     ->    ["Coca cola", 3, "coca", true];
        // const newArray = [];
        for (const key in response) {
          this.products.push(response[key]);
          this.originalProducts.push(response[key]);
        }
        // this.products = newArray;
        this.categories = this.products.map(element => element.category);
        this.categories = [...new Set(this.categories)];
    }); 
  }

  // EI SAA [(ngModel)] kirjutada div sisse
  // kehtib vaid input sees:
  // .ts selectedCategory: string = ""
  // [(ngModel)]="selectedCategory"

  // (click)=onFilterByCategory(category)
                // (category: string)
  onFilterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === '') {
      this.products = this.originalProducts;
    } else {
      this.products = this.originalProducts.filter(element => element.category === category);
    }
  }

  // [{1},{2},{3},{1},{1},{2},{1}]
  // [{toode: {1}, kogus: 4},{toode: {2}, kogus: 2}, {toode: {3}, kogus: 1}]
                //{id: 3, nimi: "C", hind: 32}
  onAddToCart(productClicked: Product) {
    const cartItemsSS = sessionStorage.getItem("cartItems");
    let cartItems: CartProduct[] = [];
    if (cartItemsSS) { // cartItemsSS !== null
      cartItems = JSON.parse(cartItemsSS);
    }   // [{id: 1},{id: 2}, {id: 3}]
                                //                                            3
    const index = cartItems.findIndex(element => element.product.id === productClicked.id);
    if (index >= 0) {
      cartItems[index].quantity++;  // suurenda täpselt 1 võrra
      // cartItems[index].quantity += 2;
      // cartItems[index].quantity = cartItems[index].quantity/2 + 2;
    } else {
      const parcelMachineIndex = cartItems.findIndex(element => element.product.id === 11110000);
      if (parcelMachineIndex >= 0) {
        cartItems.splice(parcelMachineIndex,0,{ product: productClicked, quantity: 1 });
      } else {
        cartItems.push({ product: productClicked, quantity: 1 });
      }
    }

    // enne kui pushin otsi üles kas sellist toodet juba on ostukorvi esemete hulgas
    // sulgude seest tuleva eseme ID ---> product.id
    // otsin kas seda on cartItems seas  ----> .findIndex(element => element.id === product.id)
    // kui ON, siis teen ühte loogikat
    // kui EI OLE, siis teen teist loogikat
    // if ()  index >= 0  ---> suurendan kogust
    // else  index === -1  --->   lisan ostukorvi  .push abil 

    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    this.productService.cartChanged.next(true);
  }

  onSortAZ() {
    this.products.sort((a,b) => a.name.trim().localeCompare(b.name.trim()) );
  }

  onSortZA() {
    this.products.sort((a,b) => b.name.trim().localeCompare(a.name.trim()) );
  }

  onSortPriceAsc() {
    this.products.sort((a,b) => a.price - b.price );
  }

  onSortPriceDesc() {
    this.products.sort((a,b) => b.price - a.price );
  }

}
