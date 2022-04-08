import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vaata-tooteid',
  templateUrl: './vaata-tooteid.component.html',
  styleUrls: ['./vaata-tooteid.component.css']
})
export class VaataTooteidComponent implements OnInit {
  tooted = [
    {nimi: "Coca cola", hind: 2, aktiivne: true},
    {nimi: "Fanta", hind: 3, aktiivne: false}, 
    {nimi: "Sprite", hind: 2.5, aktiivne: false}, 
    {nimi: "Vichy", hind: 4, aktiivne: true}, 
    {nimi: "Vitamin well", hind: 6, aktiivne: true}
  ];

  constructor() { }

  ngOnInit(): void {
    const tootedLS = localStorage.getItem("tooted");
    if (tootedLS) { // tootedLS !== null
      this.tooted = JSON.parse(tootedLS);
    }
  }

  kustutaToode(toode: any) {
    console.log(toode); // toodet ei saadetud korralikult - HTML-s on korrektne
    const j2rjekorraNumber = this.tooted.indexOf(toode);
    console.log(j2rjekorraNumber); // indexit ei suudetud korralikult leida
    this.tooted.splice(j2rjekorraNumber, 1);
    console.log(this.tooted); // ei suudetud kustutada
    localStorage.setItem("tooted", JSON.stringify(this.tooted));
    // minna localStorage-sse ja kas muutus

    // 10:10
  }

}
