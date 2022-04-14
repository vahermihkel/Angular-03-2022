import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yksik-toode',
  templateUrl: './yksik-toode.component.html',
  styleUrls: ['./yksik-toode.component.css']
})
export class YksikToodeComponent implements OnInit {
  toode: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const toodeNimi = location.href.split("toode/")[1];
    console.log(toodeNimi);

    // const tootedLS = localStorage.getItem("tooted");
    // console.log(tootedLS);
    // if (tootedLS) { // tootedLS !== null
    //   const tooted: any[] = JSON.parse(tootedLS);
    //   console.log(tooted);
    this.http.get<any>(
      "https://angular-03-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json")
                  .subscribe(tootedFB => { // asünkroonne ehk lubab koodil edasi minna
      const uusMassiiv = [];
      for (const key in tootedFB) {
        uusMassiiv.push(tootedFB[key]);
      }
      const tooted = uusMassiiv;
      this.toode = tooted.find(element => 
        element.nimi.replaceAll(" ", "-").toLowerCase() === toodeNimi);
        console.log(this.toode); // undefined
    })
    // }
    
    // hind / aktiivne
  }

}
