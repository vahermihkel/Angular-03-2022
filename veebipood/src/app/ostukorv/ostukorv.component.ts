import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ostukorv',
  templateUrl: './ostukorv.component.html',
  styleUrls: ['./ostukorv.component.css']
})
export class OstukorvComponent implements OnInit {
  ostukorviTooted = ["Coca cola", "Fanta", "Sprite", "Vichy", "Vitamin well", "Kali"];

  constructor() { 
    console.log("pannakse Ostukorv constructor käima");
  }

  ngOnInit(): void {
    console.log("pannakse Ostukorv ngOnInit käima");
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

    // EI OLE SELLIST ASJA NAGU .remove() või .delete()
  }

  lisaToode(toode: any) {
    // console.log("töötab");
    // console.log(toode);
    // ["Coca cola", "Fanta", "Sprite", "Vichy", "Vitamin well", "Kali"]
    // "Sprite"   -> ["Coca cola", "Fanta", "Sprite", "Vichy", "Vitamin well", "Kali", "Sprite"]
    this.ostukorviTooted.push(toode);
  }

  tyhjendaTooted() {
    this.ostukorviTooted = [];
  }
  // SALVESTAMINE:
  // 1. Andmebaas
  // 2. Brauseri mälu
  // 3. Faili kirjutamine

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
