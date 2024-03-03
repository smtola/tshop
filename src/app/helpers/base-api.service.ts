import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map, Observable, pipe} from "rxjs";
import {Product} from "../pages/admin/admin-product/products.service";

export interface QueryParam {
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
  rowCount?: number;
  sorts?: string;
  filters?: string;
}

export class SharedDomain {
  id?: number;
}
export class BaseApiService<T extends SharedDomain> {

  constructor(
    private endpoint:string, private httpClient:HttpClient
  ) { }

  public getUrl = (): string => `https://oshop-6d1e4-default-rtdb.firebaseio.com/${this.endpoint}`;

  public search(query: QueryParam) {
    return this.httpClient.get<{[key:string]:Product}>(`${this.getUrl()}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams()
        .append('pageIndex', `${query.pageIndex}`)
        .append('pageSize', `${query.pageSize}`)
        .append('sorts', `${query.sorts === undefined ? '' : query.sorts}`)
        .append(
          'filters',
          `${query.filters === undefined ? '' : query.filters}`
        ),
    })
      .pipe(map((res)=>{
      const products = [];
      for (const key in res){
        if(res.hasOwnProperty(key)){
          products.push({...res[key], id: key})
        }
      }
      return products;
    }));
  }

  public find(id: string): Observable<T> {
    return this.httpClient.get<T>(`${this.getUrl()}/${id}.json`, this._get_httpHeader(id));
  }

  public edit(model: T): Observable<T> {
    return this.httpClient.put<T>(`${this.getUrl()}/${model.id}.json`, model);
  }

  public add(model: T): Observable<T> {
    return this.httpClient.post<T>(this.getUrl(), model);
  }

  public delete(id: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: id,
    };

    return this.httpClient.delete(`${this.getUrl()}/${id}.json`, options);
  }

  public _get_httpHeader(param: any): object {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: param,
    };
  }

  public getHttpParam(query: QueryParam): HttpParams {
    return new HttpParams()
      .append('pageIndex', `${query.pageIndex}`)
      .append('pageSize', `${query.pageSize}`)
      .append('sorts', `${query.sorts === undefined ? '' : query.sorts}`)
      .append(
        'filters',
        `${query.filters === undefined ? '' : query.filters}`
      );
  }
}
