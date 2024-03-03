import { Injectable } from '@angular/core';
import {BaseApiService} from "../../../helpers/base-api.service";
import {HttpClient} from "@angular/common/http";

export interface Product {
  title?: string;
  price?: string;
  category?: string;
  imageUrl?: string;
  id?: 0;
}
@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseApiService<any>{
  constructor(private http:HttpClient) {
    super('products.json', http);
  }
}
@Injectable({
  providedIn: 'root'
})
export class ProductsEditService extends BaseApiService<any>{
  constructor(private http:HttpClient) {
    super('products', http);
  }
}
