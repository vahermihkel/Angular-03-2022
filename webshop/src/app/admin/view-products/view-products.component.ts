import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  products: any[] = [];
  dbUrl = "https://webshop-03-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(this.dbUrl).subscribe(response => { 
        for (const key in response) {
          this.products.push(response[key]);
        }
    }); 
  }

}

/* KODUS: 
* Eelmises mõnes projektis kogustega kokkuarvutus

* Ostukorvi kogusumma (cart)
* Maksmine (cart)
* Muutmine (juba alustatud)
* Lisamine (! 7tk)

TEEME JÄRGMISENA:
R
* ostukorvi kujundus -- CSS
* sorteerimine
* Karusell-galerii avalehel   Angular Bootstrap
* Kaardirakendus    Leaflet

T
* kategooriad andmebaasi
* Muutmisel saab võtta dropdownist kategooriaid
* Lisamisel saab võtta dropdownist kategooriaid

R + T
* Sisselogimine/Registreerumine (saadan failid e-mailile 5 faili)
        administraatorile
* URL peitmine (/admin ei saa)
* avalehel on aktiivsed tooted vaid näha
* sisselogitud kasutajal on avalehel ka mitteaktiivseid
* sisselogitud kasutajal on aktiivsetel toodetel roheline piir ümber,
  mitteaktiivsetel punane

R
* filtreerimine - vajutan mingi kindla kategooria peale ja näidatakse vaid
      seda kategooriat
* emailide saatmine
* pakiautomaadid ostukorvi

* ?? piltide üleslaadimine Firebase-i (Firebase Storage)


 */

