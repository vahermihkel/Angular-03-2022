import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productId!: number;
  products: Product[] = [];
  idUnique = false;
  categories: {categoryName: string}[] = [];
  selectedFile!: File;

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private imageUploadService: ImageUploadService) { }

  // KUI LÄHEN LEHELE, vahetult enne HTMLi pannakse käima ngOnInit
  // LEHELE MINNES TAHAN NÄHA KÕIKI KATEGOORIAID
  ngOnInit(): void {
    this.categoryService.getCategoriesFromDb().subscribe(categoriesFromDb => {
      const newArray = [];
      for (const key in categoriesFromDb) {
        newArray.push(categoriesFromDb[key]);
      }
      this.categories = newArray;
    });

    this.productService.getProductsFromDb().subscribe(response => { 
      this.products = response;
    }); 
  }

  onCheckIdUniqueness() {
    const index = this.products.findIndex(element => element.id === this.productId );
    if (index >= 0) {
      this.idUnique = false;
    } else {
      this.idUnique = true;
    }
  }

  handleFileInput(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  sendPictureToDb() {
    this.imageUploadService.uploadPicture(this.selectedFile);
  }

  onSubmit(addProductForm: NgForm) {
    // this.http.post(this.dbUrl, addProductForm.value).subscribe();
    const url = this.imageUploadService.uploadedPictureUrl;

    const val = addProductForm.value;
    const newProduct = new Product(val.id,val.name, url, val.price, val.category,
      val.description, val.isActive);

    // const newProduct2 = {id: val.id, name: val.name, imgSrc: url, price: val.price,
    // category: val.category, description: val.description, isActive: val.isActive }

    this.productService.addProductToDb(newProduct).subscribe();
    addProductForm.reset();
  }
}
