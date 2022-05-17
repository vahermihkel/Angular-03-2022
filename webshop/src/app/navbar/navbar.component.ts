import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth/auth.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sumOfCart = 0;
  // muutuja mida muudan
  // html-i ngIf sisse selle muutuja
  // subscribe sees see muutub
  loggedIn = false;

  constructor(private translate: TranslateService,
    private productService: ProductService,
    private authService: AuthService) { }

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

    // Subject --- .subscribe() läheb käima AINULT .next vajutades
    // BehaviorSubject --- .subscribe() läheb käima .next vajutades JA kohe kui kood
        // jõuab .subscribe juurde
    this.authService.loggedInChanged.subscribe(loggedInFromSubject => {
      this.loggedIn = loggedInFromSubject;
    }) 
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  onLogout() {
    this.authService.loggedInChanged.next(false);
    this.authService.logout();
  }

}
