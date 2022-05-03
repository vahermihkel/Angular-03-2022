import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  descriptionWordCount = 5;
  products: Product[] = [];
  dbUrl = "https://webshop-03-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Product[]>(this.dbUrl).subscribe(response => { 
        for (const key in response) {
          this.products.push(response[key]);
        }
    }); 
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
* Shops andmebaasi

// KOJU: Karusell-galerii pildid andmebaasi URL-na https://picsum.photos/

T+R
* Sisselogimine/Registreerumine (saadan failid e-mailile 5 faili)
        administraatorile
* URL peitmine (/admin ei saa)
* avalehel on aktiivsed tooted vaid näha
* sisselogitud kasutajal on avalehel ka mitteaktiivseid
* sisselogitud kasutajal on aktiivsetel toodetel roheline piir ümber,
  mitteaktiivsetel punane

T
* filtreerimine - vajutan mingi kindla kategooria peale ja näidatakse vaid
      seda kategooriat
* emailide saatmine
* pakiautomaadid ostukorvi

R
Observables

* Id kontroll - iga klahvivajutusega läheb kontrollima kas selline ID on olemas
   nii muutmisel kui lisamisel
* Admin vaates otsinguväli - iga klahvivajutusega filtreerib tooted
* ?? piltide üleslaadimine Firebase-i (Firebase Storage)


 */

