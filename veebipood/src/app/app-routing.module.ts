import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminKoduComponent } from './admin/admin-kodu/admin-kodu.component';
import { LisaToodeComponent } from './admin/lisa-toode/lisa-toode.component';
import { MuudaToodeComponent } from './admin/muuda-toode/muuda-toode.component';
import { VaataTooteidComponent } from './admin/vaata-tooteid/vaata-tooteid.component';
import { AvalehtComponent } from './avaleht/avaleht.component';
import { OstukorvComponent } from './ostukorv/ostukorv.component';
import { YksikToodeComponent } from './yksik-toode/yksik-toode.component';

const routes: Routes = [
  // localhost:4200/   avaleht.component.html -> avaleht.css ja avaleht.ts
  { path: "", component: AvalehtComponent },
  // localhost:4200/ostukorv   ostukorv.component.html -> ostukorv.css ja ostukorv.ts
  { path: "ostukorv", component: OstukorvComponent },
  { path: "toode/:tooteNimi", component: YksikToodeComponent },// <-----------
  { path: "admin", component: AdminKoduComponent },
  { path: "admin/lisa", component: LisaToodeComponent },
  { path: "admin/muuda/:tooteNimi", component: MuudaToodeComponent },
  { path: "admin/tooted", component: VaataTooteidComponent },
];

// R
// Üksiku toote vaatamine

// T
// Muutmine (lisamisest ja üksikust vaatamisest)
// Maksmine - API päring EveryPay

// N
// andmebaas - API päring
// (N/T)
// UUS ingl. projekt
// tõlked
// bootstrap
// toastify

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
