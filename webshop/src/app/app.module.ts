import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService, AngularToastifyModule } from 'angular-toastify'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { ViewProductsComponent } from './admin/view-products/view-products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ThousandSeparatorPipe } from './pipes/thousand-separator.pipe';
import { DescriptionShortenerPipe } from './pipes/description-shortener.pipe';
import { ShopsComponent } from './shops/shops.component';
import { CategoryComponent } from './admin/category/category.component';
import { ShopsSettingsComponent } from './admin/shops-settings/shops-settings.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CarouselSettingsComponent } from './admin/carousel-settings/carousel-settings.component';
import { CarouselGalleryComponent } from './home/carousel-gallery/carousel-gallery.component';
import { SortButtonsComponent } from './home/sort-buttons/sort-buttons.component';
import { ParcelMachinesComponent } from './cart/parcel-machines/parcel-machines.component';
import { FilterBarComponent } from './home/filter-bar/filter-bar.component';
import { ProductCardComponent } from './home/product-card/product-card.component';
import { CartProductComponent } from './cart/cart-product/cart-product.component';
import { SendEmailComponent } from './shops/send-email/send-email.component';
import { MapComponent } from './shops/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    AdminHomeComponent,
    AddProductComponent,
    EditProductComponent,
    ViewProductsComponent,
    NavbarComponent,
    ThousandSeparatorPipe,
    DescriptionShortenerPipe,
    ShopsComponent,
    CategoryComponent,
    ShopsSettingsComponent,
    LoginComponent,
    SignupComponent,
    CarouselSettingsComponent,
    CarouselGalleryComponent,
    SortButtonsComponent,
    ParcelMachinesComponent,
    FilterBarComponent,
    ProductCardComponent,
    CartProductComponent,
    SendEmailComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularToastifyModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
