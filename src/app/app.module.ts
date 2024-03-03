import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DemoNgZorroAntdModule} from "./nz-zorro-antdesign.model";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NavbarComponent} from "./share-components/navbar/navbar.component";
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {LoginComponent} from "./pages/login/login.component";
import {environment} from "../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {AdminProductComponent} from "./pages/admin/admin-product/admin-product.component";
import {ProductFormComponent} from "./pages/admin/product-form/product-form.component";
import {RowNumberPipe} from "./pipes/row-number.pipe";
import {NoResultFoundComponent} from "./share-components/no-result-found.component";
import {FilterSearchComponent} from "./share-components/filter-search/filter-search.component";
import {PangeNotFound} from "./share-components/page-not-found.component";
import {MenuComponent} from "./share-components/menu/menu.component";
import {ShippingCartComponent} from "./pages/shipping-cart/shipping-cart.component";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    LoginComponent,
    AdminProductComponent,
    ProductFormComponent,
    RowNumberPipe,
    NoResultFoundComponent,
    FilterSearchComponent,
    PangeNotFound,
    MenuComponent,
    ShippingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
