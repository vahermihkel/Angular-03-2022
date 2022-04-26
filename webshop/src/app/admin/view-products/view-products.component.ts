import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  products: any[] = [];
  dbUrl = "https://webshop-03-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(this.dbUrl).subscribe(response => { 
        for (const key in response) {
          this.products.push(response[key]);
        }
    }); 
  }

}
