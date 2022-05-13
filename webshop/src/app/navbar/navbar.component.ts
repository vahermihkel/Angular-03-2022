import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sumOfCart = 0;

  constructor(private translate: TranslateService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.cartChanged.subscribe(() => {
      const cartItemsSS = sessionStorage.getItem("cartItems");
      let cartProducts = [];
      if (cartItemsSS) {
        cartProducts = JSON.parse(cartItemsSS); 
      }
      this.sumOfCart = 0;
      cartProducts.forEach((element: any) => {
        this.sumOfCart += element.product.price * element.quantity;
      });
    })
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

}
