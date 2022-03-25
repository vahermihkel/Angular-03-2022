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

  constructor() { 
    console.log("pannakse Avaleht constructor käima");
  } // constructor erinevate failide sidumiseks

  ngOnInit(): void { // käimaminemise funktsioon
    console.log("pannakse Avaleht ngOnInit käima");
    // parem klõps lehel (brauseris) -> inspect -> console tab
  }

}
