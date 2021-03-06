import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  dbUrl = "https://webshop-03-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  cartChanged = new BehaviorSubject(true);

  constructor(private http: HttpClient) { }

  getProductsFromDb() {
    return this.http.get<Product[]>(this.dbUrl).pipe(
      map(productsFromDb => {
        const newArray = [];
        for (const key in productsFromDb) {
          newArray.push(productsFromDb[key]);
        }
        return newArray;
      })
    );
  }

  addProductToDb(newProduct: Product) {
    return this.http.post(this.dbUrl, newProduct);
  }

  updateProductsInDb(updatedProducts: Product[]) {
    return this.http.put(this.dbUrl, updatedProducts);
  }
}
