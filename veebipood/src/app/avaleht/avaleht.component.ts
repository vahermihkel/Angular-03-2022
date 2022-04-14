import { HttpClient } from '@angular/common/http';
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
  tooted: any[] = [];

  constructor(private http: HttpClient) {
    console.log("pannakse Avaleht constructor käima");
  } // constructor erinevate failide sidumiseks

  ngOnInit(): void { // käimaminemise funktsioon
    // const tootedLS = localStorage.getItem("tooted");
    // if (tootedLS) { // tootedLS !== null
    //   this.tooted = JSON.parse(tootedLS);
    // }
    this.http.get<any>(
      "https://angular-03-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json")
                  .subscribe(tootedFB => {
      const uusMassiiv = [];
      for (const key in tootedFB) {
        uusMassiiv.push(tootedFB[key]);
      }
      this.tooted = uusMassiiv;
    })
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
