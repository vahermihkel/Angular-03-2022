import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ostukorv',
  templateUrl: './ostukorv.component.html',
  styleUrls: ['./ostukorv.component.css']
})
export class OstukorvComponent implements OnInit {
  ostukorviTooted: any[] = [];
  koguSumma = 0;

  // klasside (erinevate node_module võimaluste) 
  //    Angulari koodilõikude
  //    ühendamine selle component külge
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log("pannakse Ostukorv ngOnInit käima");
    const ostukorvSS = sessionStorage.getItem("ostukorviTooted");
    if (ostukorvSS !== null) {
      this.ostukorviTooted = JSON.parse(ostukorvSS);
    }
    this.arvutaKogusumma();
  }

  // UUE MUUTUJA TEKITAMINE (uus väärtus ja sellele viitav sõna)
  // 1. sulgude sees -- toode --   ta saab väärtuse HTML-s (click)="kustutaToode('S')" 
                    // HTML-st saadetakse väärtus
  // 2. const või let abil -- j2rjekorraNumber -- saab väärtuse funktsiooni sees
                    // nähtav ainult funktsiooni sees
  // 3. klassimuutuja -- ostukorviTooted -- saab väärtuse export class all
                    // saan saata HTMLi ja funktsioonid saavad seda muutujat kätte this. abil
              // "S"
  kustutaToode(toode: any) {       
    // js delete element from array  -- stackoverflow
    // codegrepper.com

    // find index with .indexOf    mozilla indexof
    // remove with .splice()     mozilla splice
                        //["C", "F", "S", "V", "VW"].indexOf("S");
                        //    2
    // const j2rjekorraNumber = 2;
    // ostukorviTooted.splice(2,1);
    const j2rjekorraNumber = this.ostukorviTooted.indexOf(toode);
    this.ostukorviTooted.splice(j2rjekorraNumber,1);
    sessionStorage.setItem("ostukorviTooted", JSON.stringify(this.ostukorviTooted));
    // EI OLE SELLIST ASJA NAGU .remove() või .delete()
    this.arvutaKogusumma();
  }

  lisaToode(toode: any) {
    // console.log("töötab");
    // console.log(toode);
    // ["Coca cola", "Fanta", "Sprite", "Vichy", "Vitamin well", "Kali"]
    // "Sprite"   -> ["Coca cola", "Fanta", "Sprite", "Vichy", "Vitamin well", "Kali", "Sprite"]
    this.ostukorviTooted.push(toode);
    sessionStorage.setItem("ostukorviTooted", JSON.stringify(this.ostukorviTooted));
    this.arvutaKogusumma();
  }

  tyhjendaTooted() {
    this.ostukorviTooted = [];
    sessionStorage.setItem("ostukorviTooted", JSON.stringify(this.ostukorviTooted));
    this.arvutaKogusumma(); // funktsioone saan ka kasutusele võtta this. abil
  }

  private arvutaKogusumma() {
    this.koguSumma = 0;
    // [{n:'cc', hind: 2}, {n:'fa', hind: 4}, {n:'sp', hind: 3}].forEach()
    // {n:'cc', hind: 2} =>   2   =  0 + 2  
    // {n:'fa', hind: 4} =>   6   =  2 + 4 
    // {n:'sp', hind: 3} =>   9   =  6 + 3   
    this.ostukorviTooted.forEach(element => this.koguSumma = this.koguSumma + element.hind);
    // tsükli - võtta kõigi toodete küljest hind ja liita see koguSummale juurde
  }

  // SALVESTAMINE:
  // 1. Andmebaas
  // 2. Brauseri mälu
  // 3. Faili kirjutamine

  maksma() {
    const makseAndmed = {
      "api_username": "92ddcfab96e34a5f",
      "account_name": "EUR3D1",
      "amount": this.koguSumma,
      "order_reference": Math.random() * 999999,
      "nonce": "a9b7f7e79" + new Date() + Math.random() * 999999,
      "timestamp": new Date(),
      "customer_url": "https://angular-03-2022.web.app"
    }
    const headers = {
      headers: new HttpHeaders(
        {
          "Authorization": 
          "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA=="
        }
      )
    };
    this.http.post<any>("https://igw-demo.every-pay.com/api/v4/payments/oneoff",
      makseAndmed,
      headers).subscribe(tagastus => location.href = tagastus.payment_link);
  }

}

  // string = "Sõnaline muutuja"; // "22" + "33" --> "2233"
  // number = 22; // numbriline muutuja, saan teha arvutusi 
  // boolean = true; // kahendväärtus: rangelt kas true või false

  // korrutaKahega() {
  //   //     44   =  22 * 2
  //   //     88   =  44 * 2
  //   this.number = this.number * 2;
  // }

  // muudaBoolean() {
  //   this.boolean = false;
  // }

  // tyhjendaString() {
  //   this.string = "";
  // }

  // muudaBoolean2() {
  //   this.boolean = !this.boolean;
  // }

  // muutujad ja funktsioonid algavad väikse tähega
  // ja iga järgnev sõna on suure tähega

  /* funktsioon saab errori kui ei ole () ja {}
     funktsiooni nime järel olevad tavalised sulud
    tähistavad millegi vastuvõtmist - HTMLst
    
    loogelised sulud funktsiooni järel tähistavad
    selle funktsiooni algust ja lõppu
    */
