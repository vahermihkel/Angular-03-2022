import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvalehtComponent } from './avaleht/avaleht.component';
import { OstukorvComponent } from './ostukorv/ostukorv.component';
import { LisaToodeComponent } from './admin/lisa-toode/lisa-toode.component';
import { MuudaToodeComponent } from './admin/muuda-toode/muuda-toode.component';
import { VaataTooteidComponent } from './admin/vaata-tooteid/vaata-tooteid.component';
import { AdminKoduComponent } from './admin/admin-kodu/admin-kodu.component';
import { FormsModule } from '@angular/forms';
import { YksikToodeComponent } from './yksik-toode/yksik-toode.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AvalehtComponent,
    OstukorvComponent,
    LisaToodeComponent,
    MuudaToodeComponent,
    VaataTooteidComponent,
    AdminKoduComponent,
    YksikToodeComponent
  ],
  imports: [
    // HTMLi jaoks olevad impordid
    BrowserModule, // *ngFor, *ngIf
    AppRoutingModule, // routerLink=""
    FormsModule, // ngForm
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
