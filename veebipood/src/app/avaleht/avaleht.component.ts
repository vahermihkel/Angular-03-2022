import { Component, OnInit } from '@angular/core'; // import node_modules seest

@Component({ // tehakse Componentiks
  selector: 'app-avaleht', // kuidas teda kasutusele võtta
  templateUrl: './avaleht.component.html', // seotakse HTML
  styleUrls: ['./avaleht.component.css']  // seotakse CSS
})
export class AvalehtComponent implements OnInit { // export - saaks importida
  // class - funktsioon/muutuja/class
  // AvalehtComponent - class nimetus
  // implement OnInit - ei lase ngOnInit funktsiooni kustutada

  // massiiv / list / array
              // 5st elemendist
  tooted = [
    {nimi: "Coca cola", hind: 2, aktiivne: true},
    {nimi: "Fanta", hind: 3, aktiivne: false}, 
    {nimi: "Sprite", hind: 2.5, aktiivne: false}, 
    {nimi: "Vichy", hind: 4, aktiivne: true}, 
    {nimi: "Vitamin well", hind: 6, aktiivne: true}
  ];

  constructor() {
    console.log("pannakse Avaleht constructor käima");
  } // constructor erinevate failide sidumiseks

  ngOnInit(): void { // käimaminemise funktsioon
    console.log("pannakse Avaleht ngOnInit käima");
    // parem klõps lehel (brauseris) -> inspect -> console tab
  }

            // 1.{n: "C", h: 2}
            // 2.{n: "F", h: 3}
  lisaOstukorvi(toode: any) {
        // 1.const ostukorvSS = null;
        // 2.const ostukorvSS = "[{n: "C", h: 2}]"
    const ostukorvSS = sessionStorage.getItem("ostukorviTooted");
    let ostukorv = [];
    if (ostukorvSS !== null) { // null - tühjus      !==  ei võrdu
      // 2.       = JSON.parse("[{n: "C", h: 2}]") -> [{n: "C", h: 2}]
      // 2. ostukorv = [{n: "C", h: 2}];
      ostukorv = JSON.parse(ostukorvSS);
    }
    // 1. [].push({n: "C", h: 2})  --> [{n: "C", h: 2}]
    // 2. [{n: "C", h: 2}].push({n: "F", h: 3}) -> [{n: "C", h: 2},{n: "F", h: 3}]
    ostukorv.push(toode);
    //1. Key="ostukorviTooted"  Value=[{n: "C", h: 2}] Object object
    //1. JSON.stringify   [{n: "C", h: 2}] ->  "[{n: "C", h: 2}]"
    //2. [{n: "C", h: 2},{n: "F", h: 3}]   --> JSON.stringify()
    // 2. "[{n: "C", h: 2},{n: "F", h: 3}]"
    sessionStorage.setItem("ostukorviTooted", JSON.stringify(ostukorv));
  }

  // salvestamine:
  // 1. andmebaas - kasutajad, tellimused, tooted
  // 2. brauserisse - ostukorvi sisu, veebilehe seaded
  // 3. faili

  // kirjaviis on arendajate kokkulepe
  // camelCase - muutujad ja funktsioonid
  // PascalCase - klassid
  // snake_case -
  // kebab-case
}
