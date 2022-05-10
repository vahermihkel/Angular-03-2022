import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

declare let Email: any;
import 'src/assets/smtp.js';

import * as L from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit, AfterViewInit, OnDestroy  {
  dbUrl = "https://webshop-03-22-default-rtdb.europe-west1.firebasedatabase.app/shops.json";
  shops: {shopName: string, 
    latitude: number, 
    longitude: number, openTimes: string}[] = [];

  private map!: L.Map;
  private lng = 59.4341;
  private lat = 24.7489;
  private zoom = 11;
  private marker!: L.Marker;
  private marker2!: L.Marker;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.lng, this.lat ],
      zoom: this.zoom
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    // this.marker = L.marker([59.4295, 24.7224]);  
    // this.marker.addTo(this.map);
    // this.marker.bindPopup("<div>Kristiine keskus</div><br><div>Lahtioleku aeg: 9-19</div>");

    // this.marker2 = L.marker([59.4246, 24.7928]);  
    // this.marker2.addTo(this.map);
    // this.marker2.bindPopup("<div>Ülemiste keskus</div><br><div>Lahtioleku aeg: 9-20</div>");
    this.shops.forEach(element => {
        this.marker = L.marker([element.latitude, element.longitude]);  
        this.marker.addTo(this.map);
        this.marker.bindPopup("<div>"+element.shopName+
          "</div><br><div>Lahtioleku aeg: "+
          element.openTimes+"</div>");
    })

  }

  constructor(private http: HttpClient) { }

  // lifecycle functions
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.http.get<{shopName: string, 
      latitude: number, 
      longitude: number, openTimes: string}[]>(this.dbUrl).subscribe(shopsFromDb => {
      const newArray = [];
      for (const key in shopsFromDb) {
        newArray.push(shopsFromDb[key]);
      }
      this.shops = newArray;
      this.initMap();
    });
  }

  onZoomShop(shopName: string) {
    const shopFound = this.shops.find(element => element.shopName === shopName);
    if (shopFound) {
      this.map.setView(L.latLng([shopFound.latitude, shopFound.longitude]),13);
      // this.marker.openPopup(); <- läks vigaseks, ärme kasuta
    } else {
      this.map.setView(L.latLng([59.4341, 24.7489]),11);
      // this.marker.closePopup(); <- läks vigaseks, ärme kasuta
    }
  }

  // <input [(ngModel)]="muutuja" type="text" />
  // <input [(ngModel)]="pealkiri" type="text" />

  muutuja: any;
  pealkiri: any;

  onSendEmail() {
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "mihkelvaher@hotmail.com",
        Password : "6A204D40F59AE91015798FCC6894B945DDE7",
        To : 'mihkelvaher@hotmail.com',
        From : "vahermihkel@gmail.com",
        Subject : this.pealkiri,
        Body : "Klient kirjutas: " +  this.muutuja + " . Saadetud: " + new Date()
    }).then(
      (message: any) => alert(message)
    );
  }

  ngOnDestroy() {} // ära minnakse, pannakse funktsioon käima
  
}
