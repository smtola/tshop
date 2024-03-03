import { Injectable } from '@angular/core';
import {BaseApiService} from "../../../helpers/base-api.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseApiService<any>{
  constructor(http:HttpClient) {
    super('categories.json',http);
  }
}
