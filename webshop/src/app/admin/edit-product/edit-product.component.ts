import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  products: any[] = [];
  dbUrl = "https://webshop-03-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  constructor(private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {
   // window.location.href.split("muuda/")[1]
   // Angulari moodulit URL parameetri kättesaamiseks
   // 1. pöördun route muutuja abil ActivatedRoute klassi sisse
   // 2. snapshot võtab seisundi tolle hetke URL-st
   // 3. paramMap võtab kõik võti-väärtus paarid URL-st (URLs kooloniga)
   // 4. get() võtab sulgude sees antud võtme väärtuse URL-st
    const productId = this.route.snapshot.paramMap.get("productId");
    console.log(productId);
    this.http.get<any>(this.dbUrl).subscribe(response => { 
      for (const key in response) {
        this.products.push(response[key]);
      }
      console.log("siia jõuan hiljem kuigi on üleval pool")
      console.log(this.products);
    }); 
    // this.products.find()
    console.log("siia jõuan varem kuigi on allpool")
    console.log(this.products);
  }

}
