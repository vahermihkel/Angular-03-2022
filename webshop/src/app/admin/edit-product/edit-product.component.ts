import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  products: any[] = [];
  dbUrl = "https://webshop-03-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  categoriesDbUrl = "https://webshop-03-22-default-rtdb.europe-west1.firebasedatabase.app/categories.json";

  product: any;
  editProductForm!: FormGroup;
  categories: {categoryName: string}[] = [];

  constructor(private route: ActivatedRoute,
    private http: HttpClient, // koma eelmise järel
    private router: Router) { } // Router tuleb importida

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
      // SIIN PEAN .FIND TEGEMA
      this.product = this.products.find(element => Number(element.id) === Number(productId));
      // SIIN PEAN FORMSGROUP LOOMA -- ! kõigele import FormsGroup, FormsControl
          // ({id: new FormsControl})    7tk  - vasakul pool sama nimetusega nagu HTML-s
      this.editProductForm = new FormGroup({
        id: new FormControl(this.product.id),
        name: new FormControl(this.product.name),
        price: new FormControl(this.product.price),
        imgSrc: new FormControl(this.product.imgSrc),
        category: new FormControl(this.product.category),
        description: new FormControl(this.product.description),
        active: new FormControl(this.product.active),
      })
    }); 
    // this.products.find()
    console.log("siia jõuan varem kuigi on allpool")
    console.log(this.products);
    this.http.get<{categoryName: string}[]>(this.categoriesDbUrl).subscribe(categoriesFromDb => {
      const newArray = [];
      for (const key in categoriesFromDb) {
        newArray.push(categoriesFromDb[key]);
      }
      this.categories = newArray;
    });
  }

  onSubmit() {
    const queueNumber = this.products.indexOf(this.product);
    this.products[queueNumber] = this.editProductForm.value;
    this.http.put(this.dbUrl, this.products).subscribe(()=>this.router.navigateByUrl("/admin/halda") );
       // see suunab tagasi lehele instead of form.reset
  }

}
