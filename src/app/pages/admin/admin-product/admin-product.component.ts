import {Component, OnInit} from '@angular/core';
import {Product, ProductsService} from "./products.service";
import {QueryParam} from "../../../helpers/base-api.service";
import {NzTableQueryParams} from "ng-zorro-antd/table";

@Component({
  selector: 'app-admin-product',
  template: `
    <div class="container" nz-row>
      <div nz-col nzFlex="500px">
        <nz-card style="width:300px;"  style="display:flex;justify-content:center;margin: 15px;">
          <a nz-button nzType="primary" nzSize="large" nzShape="round" routerLink="./admin/products/new">
            <span nz-icon nzType="plus"></span>
            Add New
          </a>
        </nz-card>

      </div>
      <div nz-col nzFlex="auto">

        <filter-search
                       #query
                       (filterChanged)="onSearch($event);param.pageIndex = 1;search();"
        ></filter-search>

        <nz-table
          nzShowSizeChanger
          nzSize="small"
          [nzData] = "list"
          [nzLoading]="loading"
          [nzNoResult]="noResult"
          #fixedTable
          [nzScroll]="{x:'1000px'}"
          nzTableLayout = "fixed"
          [nzTotal]="param.rowCount || 0"
          [nzPageIndex]="param.pageIndex || 0"
          (nzQueryParams)="onQueryParamsChange($event)"
        >
          <ng-template #noResult>
            <no-result-found></no-result-found>
          </ng-template>
          <thead>
          <tr>
            <th style="width: 3%">#</th>
            <th style="width:10%" nzColumnKey="title">Title</th>
            <th style="width:10%" nzColumnKey="price">Price</th>
            <th style="width:10%"></th>
          </tr>
          </thead>
          <tbody>
          <ng-container *ngFor="let dataList of list; index as i">
            <tr *ngIf="searchText === '' || dataList.title.includes(searchText)">
              <td nzEllipsis>
                {{
                i
                  | rowNumber
                  : { index: param.pageIndex || 0, size: param.pageSize || 0 }
                }}</td>
              <td nzEllipsis>{{ dataList.title }}</td>
              <td nzEllipsis>{{ dataList.price | currency:'USD':true }}</td>
              <td>
                <a nz-button nzType="link" [routerLink]="['./admin/products',dataList.id]">Edit</a>
              </td>
            </tr>
          </ng-container>
          </tbody>
        </nz-table>
      </div>
    </div>

  `,
  styles: [`
    .container{
      padding:2rem 1.5rem;
    }
  `]
})
export class AdminProductComponent implements OnInit{
  constructor(
    private service:ProductsService,
  ) {
  }

  loading = false;
  searchText = '';
  list: Product [] = [];
  param:QueryParam = {
    pageIndex:1,
    sorts: '',
    filters:''
  }

  ngOnInit() {
    this.search();
  }

  onSearch(e:string){
      this.searchText = e;
  }

  search(){
    if(this.loading){
      return;
    }
    this.loading = true;
    setTimeout(()=>{
      this.service.search(this.param).subscribe(
        (result: Product[]) => {
          this.loading = false;
          this.list = result;
        },(error:any)=>{
          this.loading = false;
          console.log(error);
        }
      )
    },50)
  }

  onQueryParamsChange(param: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = param;
    const sortFound = sort.find((x) => x.value);
    this.param.sorts =
      (sortFound?.key ?? 'name') + (sortFound?.value === 'descend' ? '-' : '');
    this.param.pageSize = pageSize;
    this.param.pageIndex = pageIndex;
    this.search();
  }
}
