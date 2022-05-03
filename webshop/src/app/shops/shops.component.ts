import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
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
  // kooloni abil näitan tüüpi
  // võrdusmärgi abil annan väärtuse

  // kui on kohe väärtuse andmine, siis ei pea tüüpi andma,
  // sest siis tunneb ta ise tüübi väärtuse järgi ära

  // :string, :number, :boolean

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

    this.marker = L.marker([59.4295, 24.7224]);  
    this.marker.addTo(this.map);
    this.marker.bindPopup("<div>Kristiine keskus</div><br><div>Lahtioleku aeg: 9-19</div>");

    this.marker2 = L.marker([59.4246, 24.7928]);  
    this.marker2.addTo(this.map);
    this.marker2.bindPopup("<div>Ülemiste keskus</div><br><div>Lahtioleku aeg: 9-20</div>");
  }

  constructor() { }

  // lifecycle functions
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  onZoomShop(shopName: string) {
    if (shopName === "kristiine") {
      this.map.setView(L.latLng([59.4295, 24.7224]),13);
      this.marker.openPopup();
    } else if (shopName === "ylemiste") {
      this.map.setView(L.latLng([59.4246, 24.7928]),13);
      this.marker2.openPopup();
    } else {
      this.map.setView(L.latLng([59.4341, 24.7489]),11);
      this.marker.closePopup();
      this.marker2.closePopup();
    }
  }

  ngOnDestroy() {} // ära minnakse, pannakse funktsioon käima
  
}
