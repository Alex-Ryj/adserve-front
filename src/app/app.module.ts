import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { ItemComponent } from './item/item.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from './api/api.module';


@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule.forRoot({ rootUrl: 'http://127.0.0.1:8080' }),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
