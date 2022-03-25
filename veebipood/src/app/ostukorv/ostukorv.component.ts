import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ostukorv',
  templateUrl: './ostukorv.component.html',
  styleUrls: ['./ostukorv.component.css']
})
export class OstukorvComponent implements OnInit {

  string = "Sõnaline muutuja"; // "22" + "33" --> "2233"
  number = 22; // numbriline muutuja, saan teha arvutusi 
  boolean = true; // kahendväärtus: rangelt kas true või false

  constructor() { 
    console.log("pannakse Ostukorv constructor käima");
  }

  ngOnInit(): void {
    console.log("pannakse Ostukorv ngOnInit käima");
  }

  korrutaKahega() {
    //     44   =  22 * 2
    //     88   =  44 * 2
    this.number = this.number * 2;
  }

  muudaBoolean() {
    this.boolean = false;
  }

  tyhjendaString() {
    this.string = "";
  }

  muudaBoolean2() {
    this.boolean = !this.boolean;
  }

  // muutujad ja funktsioonid algavad väikse tähega
  // ja iga järgnev sõna on suure tähega

  /* funktsioon saab errori kui ei ole () ja {}
     funktsiooni nime järel olevad tavalised sulud
    tähistavad millegi vastuvõtmist - HTMLst
    
    loogelised sulud funktsiooni järel tähistavad
    selle funktsiooni algust ja lõppu
    */

}
