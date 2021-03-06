import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-muuda-toode',
  templateUrl: './muuda-toode.component.html',
  styleUrls: ['./muuda-toode.component.css']
})
export class MuudaToodeComponent implements OnInit {
  toode: any;
  muutmiseVorm: any;
  private tooted: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void { // ngOnInit läheb alati enne HTMLi käima
    // location.href === http://localhost:4200/admin/muuda/suur-olle
    // location.href.split("muuda/") === ["http://localhost:4200/admin/", "suur-olle"];
    // location.href.split("muuda/")[0] === "http://localhost:4200/admin/";
    // location.href.split("muuda/")[1] === "suur-olle";
    const toodeNimi = location.href.split("muuda/")[1]; // võtame URL-st tootenime
    // const tootedLS = localStorage.getItem("tooted"); // võtame localStorage-st kõik tooted
    // if (tootedLS) { // tootedLS !== null  kontrollime, et tooted on olemas localStorage-st
    //   const tooted: any[] = JSON.parse(tootedLS); // võtame localStorage-st saadult jutumärgid ära
    this.http.get<any>(
      "https://angular-03-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json")
                  .subscribe(tootedFB => {
      const uusMassiiv = [];
      for (const key in tootedFB) {
        uusMassiiv.push(tootedFB[key]);
      }
      this.tooted = uusMassiiv;
      this.toode = this.tooted.find(element => 
        element.nimi
          .replaceAll(' ', '-')
          .toLowerCase()
          .replaceAll('õ', 'o') === toodeNimi);
      console.log(this.toode);
      this.muutmiseVorm = new FormGroup({   // luuakse vorm .ts sees, seega new FormGroup
        nimi: new FormControl(this.toode.nimi),    // vasaku poole kooloni ees oleva võtmega panen HTMLi
        hind: new FormControl(this.toode.hind),    // paremal pool tehakse vormi inputi kontroll (ligipääs) valmis
        aktiivne: new FormControl(this.toode.aktiivne)     // mida on võimalik lugeda-muuta
      }); 
    })  
    
      // pärast vormi loomist minnakse HTMLi ja vorm pannakse seal:    [formGroup]="muutmiseVorm"
    // }
  }

  muudaToode() {
    alert("muudetud!");
    const j2rjekorraNumber = this.tooted.indexOf(this.toode);
    this.tooted[j2rjekorraNumber] = this.muutmiseVorm.value;
    this.http.put(
      "https://angular-03-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json",
        this.tooted).subscribe();
  }

}
