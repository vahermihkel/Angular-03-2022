import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vaata-tooteid',
  templateUrl: './vaata-tooteid.component.html',
  styleUrls: ['./vaata-tooteid.component.css']
})
export class VaataTooteidComponent implements OnInit {
  tooted: any[] = [
    // {nimi: "Coca cola", hind: 2, aktiivne: true},
    // {nimi: "Fanta", hind: 3, aktiivne: false}, 
    // {nimi: "Sprite", hind: 2.5, aktiivne: false}, 
    // {nimi: "Vichy", hind: 4, aktiivne: true}, 
    // {nimi: "Vitamin well", hind: 6, aktiivne: true}
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void { // see funktsioon tehakse enne HTMLi
    // const tootedLS = localStorage.getItem("tooted");
    // if (tootedLS) { // tootedLS !== null
    //   this.tooted = JSON.parse(tootedLS);
    // }
    this.http.get<any>(
      "https://angular-03-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json")
                  .subscribe(tootedFB => { // asünkroonne ehk lubab koodil edasi minna
      console.log("ülevalpool, aga jõuab hiljem")
      const uusMassiiv = [];
      for (const key in tootedFB) {
        uusMassiiv.push(tootedFB[key]);
      }
      this.tooted = uusMassiiv;
    })
    console.log("allpool")
  }

  kustutaToode(toode: any) {
    console.log(toode); // toodet ei saadetud korralikult - HTML-s on korrektne
    const j2rjekorraNumber = this.tooted.indexOf(toode);
    console.log(j2rjekorraNumber); // indexit ei suudetud korralikult leida
    this.tooted.splice(j2rjekorraNumber, 1);
    console.log(this.tooted); // ei suudetud kustutada
    // localStorage.setItem("tooted", JSON.stringify(this.tooted));
    this.http.put(
      "https://angular-03-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json",
        this.tooted).subscribe();
    // minna localStorage-sse ja kas muutus
  }

}
