import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvalehtComponent } from './avaleht/avaleht.component';
import { OstukorvComponent } from './ostukorv/ostukorv.component';

const routes: Routes = [
  // localhost:4200/   avaleht.component.html -> avaleht.css ja avaleht.ts
  { path: "", component: AvalehtComponent },
  // localhost:4200/ostukorv   ostukorv.component.html -> ostukorv.css ja ostukorv.ts
  { path: "ostukorv", component: OstukorvComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
