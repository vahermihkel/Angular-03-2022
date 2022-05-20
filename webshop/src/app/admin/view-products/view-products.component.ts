import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  descriptionWordCount = 5;
  products: Product[] = [];
  originalProducts: Product[] = [];
  searchedProduct: string = "";

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductsFromDb().subscribe(response => { 
        this.products = response;
        this.originalProducts = response;
    }); 
  }

  onFilterProducts() {
    this.products = this.originalProducts.filter(element => 
        element.name.toLowerCase().indexOf(this.searchedProduct.toLowerCase()) >= 0 ||
        element.description.toLowerCase().indexOf(this.searchedProduct.toLowerCase()) >= 0 ||
        element.id.toString().indexOf(this.searchedProduct.toLowerCase()) >= 0
        );
  }

  onChangeProductActive(product: Product) {
    product.isActive = !product.isActive;
    this.productService.updateProductsInDb(this.products).subscribe();
  }

}

/* KODUS: 
* (Eelmises mõnes projektis kogustega kokkuarvutus)

* Muutmine (juba alustatud)
* Lisamine (! 7tk)
* Ostukorvi kogusumma (cart)
* Maksmine (cart)
* Kustutamine
* Üksiku toote vaatamine

TEEME JÄRGMISENA:
R
* ostukorvi kujundus -- CSS
* sorteerimine

T
* Karusell-galerii avalehel   Angular Bootstrap
* Kaardirakendus    Leaflet

R
* kategooriad andmebaasi
* Muutmisel saab võtta dropdownist kategooriaid
* Lisamisel saab võtta dropdownist kategooriaid
* Services

* Shops andmebaasi --- print-screenidena
* Karusell-galerii pildid andmebaasi --- iseseisvalt

// KOJU: Karusell-galerii pildid andmebaasi URL-na https://picsum.photos/

T
* pakiautomaadid ostukorvi
* Admin vaates otsinguväli - iga klahvivajutusega filtreerib tooted
* emailide saatmine

R
* Id kontroll - iga klahvivajutusega läheb kontrollima kas selline ID on olemas
   nii muutmisel kui lisamisel
* filtreerimine - vajutan mingi kindla kategooria peale ja näidatakse vaid
      selle kategooria tooteid
* Observables - subject() -- .subscribe(), .next()

T+R
* Sisselogimine/Registreerumine (saadan failid e-mailile 5 faili)
        administraatorile
* URL peitmine (/admin ei saa)
------------
* navbaris nupud vahetuvad kui on sisselogitud
* avalehel on aktiivsed tooted vaid näha
* sisselogitud kasutajal on avalehel ka mitteaktiivseid
* sisselogitud kasutajal on aktiivsetel toodetel roheline piir ümber,
  mitteaktiivsetel punane

8.45-11.45
* piltide üleslaadimine Firebase-i (Firebase Storage)
* PDF-de üleslaadimine
* toast-id
* karusell-galerii piltide väljakuvamine
* ??kujundus

T 
Proovitöö 2ak/h   9.00-10.30

R  27.05
Proovitöö 2ak/h   8.45-10.15

 */

