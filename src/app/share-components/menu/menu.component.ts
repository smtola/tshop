import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoriesService} from "../../pages/admin/admin-product/catogaries.service";
import {QueryParam} from "../../helpers/base-api.service";

@Component({
  selector: 'app-menu',
  template: `
        <nz-radio-group nzSize="large">
          <label
            nz-radio
            [nzValue]="allText"
            routerLink="/"
            name="filter"
            [(ngModel)]=" listCategory"
            (change)="selectCategory()"
          >
            {{allText}}
          </label>
        </nz-radio-group>
        <nz-radio-group [(ngModel)]="listCategory" *ngFor="let categoryList of listCategory" nzSize="large">
          <label
              name="filter"
              nz-radio
              [nzValue]="categoryList.name"
              routerLink="/"
              [queryParams]="{ category: categoryList.name}"
              name="filter"
              [(ngModel)]="listCategory"
              (change)="selectCategory()"
          >
              {{categoryList.name}}
            </label>
        </nz-radio-group>
  `,

})
export class MenuComponent implements OnInit{
  loading = false;
  allText:string = 'All Categories';
  listCategory: any[] = [];
  param:QueryParam = {};

  @Output()
  filterRadioButtonSelectionChanges: EventEmitter<string> = new EventEmitter<string>();
  constructor(private serviceCategory:CategoriesService){}

  ngOnInit() {
    this.selectCategory();
  }

  selectCategory(){
    if(this.loading){
      return;
    }
    this.loading = true;
    setTimeout(()=>{
      this.serviceCategory.search(this.param).subscribe(
        (result:any)=>{
          this.loading = false;
          this.listCategory = result;
          this.filterRadioButtonSelectionChanges.emit(result);
        },(error) => {
          console.error('Error fetching data:', error);
        }
      )
    },50)
  }
}
