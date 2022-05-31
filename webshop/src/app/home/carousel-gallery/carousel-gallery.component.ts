import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-gallery',
  templateUrl: './carousel-gallery.component.html',
  styleUrls: ['./carousel-gallery.component.css']
})
export class CarouselGalleryComponent implements OnInit {
   // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/300`);
   images: any[] = [];

   // 1. *ngFor
   // 2. objektid {url: "https://", header: "", text: "", alt: ""}
   // 3. HTML-s src={{image.url}}
  dbUrl = "https://webshop-03-22-default-rtdb.europe-west1.firebasedatabase.app/images.json";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<{imgName: string}[]>(this.dbUrl).subscribe(imagesFromDb => {
      const newArray = [];
      for (const key in imagesFromDb) {
        newArray.push(imagesFromDb[key]);
      }
      this.images = newArray;
      console.log(this.images);
    });
  }

}
