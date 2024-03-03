import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Product, ProductsEditService, ProductsService} from "../admin-product/products.service";
import { take} from "rxjs";
import {CategoriesService} from "../admin-product/catogaries.service";
import {QueryParam} from "../../../helpers/base-api.service";

@Component({
  selector: 'app-product-form',
  template:`
    <div style="display: flex;justify-content: center;margin:2rem 0;">
      <nz-card class="nz_card" nzTitle="Add Products">
        <div nz-row nz-flex nzWrap="wrap" nzJustify="center">
          <div nz-col nzFlex="200px">
            <form nz-form [formGroup]="validateForm" style="margin-left: 1rem;margin-top:1rem;" (ngSubmit)="submitForm()">
              <nz-form-item>
                <nz-form-control>
                  <nz-input-group>
                    <input type="text" [(ngModel)]="product.title" ngModel  nz-input placeholder="Title" formControlName="title" name="title" id="title" />
                  </nz-input-group>
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-control>
                  <nz-input-group nzAddOnBefore="$">
                    <input type="number" [(ngModel)]="product.price" ngModel nz-input placeholder="Price" name="price" id="price" formControlName="price"/>
                  </nz-input-group>
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-control>
                  <nz-input-group>
                    <nz-select ngModel="{{product.category}}" [nzLoading]="loading" name="category" id="category" formControlName="category">
                      <nz-option *ngFor="let c of list;" [nzValue]="c.name" nzLabel="{{c.name}}"></nz-option>
                    </nz-select>
                  </nz-input-group>
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-control>
                  <nz-input-group nzAddOnBefore="URL">
                    <input type="text" [(ngModel)]="product.imageUrl" ngModel nz-input placeholder="ImageURL" formControlName="imageUrl" name="imageUrl" id="imageUrl"/>
                  </nz-input-group>
                </nz-form-control>
              </nz-form-item>
              <nz-space nzSize="middle">
                <button *nzSpaceItem nz-button class="login-form-button login-form-margin" [nzType]="'primary'">
                  <i *ngIf="loading" nz-icon nzType="loading"></i>
                  Save
                </button>
                <button *nzSpaceItem nz-button class="login-form-button login-form-margin" nzDanger [nzType]="'primary'" (click)="delete(id)">
                  <i *ngIf="loading" nz-icon nzType="loading"></i>
                  Delete
                </button>
              </nz-space>
            </form>
          </div>

          <div nz-col nzFlex="100px">
            <nz-card class="card_product" [nzCover]="coverTemplate" >
              <nz-card-meta
                [nzTitle]="product.title"
                [nzDescription]="product.price | currency:'USD':true"
              ></nz-card-meta>
            </nz-card>
            <ng-template #coverTemplate>
              <img alt="example" [src]="product.imageUrl" *ngIf="product.imageUrl"/>
            </ng-template>
          </div>
        </div>
      </nz-card>
    </div>


  `,
  styles:[
    `
      .nz_card{
        width:585px;
        transition: all .5s ease;
      }
      .card_product{
        width:300px;
        margin:1rem 1rem;
        transition: all .5s ease;
      }
      @media screen and (max-width: 485px) {
        .nz_card{
          width:355px;
        }
      }
      @media screen and (max-width: 485px) {
        .nz_card{
          width:200px;
        }
        .card_product{
          width:200px;
        }
      }
      @media screen and (max-width: 865px) {
        .nz_card{
          width:350px;
        }
      }
      @media screen and (min-width: 1280px) {
        .nz_card{
          width:585px;
        }
      }
    `
  ]
})
export class ProductFormComponent implements OnInit{
  loading = false;
  validateForm = new FormGroup({
    title: new FormControl(),
    price: new FormControl(),
    category: new FormControl(),
    imageUrl: new FormControl(),
  });
  product: Product = {};
  list:any[]=[];
  param:QueryParam ={}
  id;
  constructor(
    private route: ActivatedRoute,
    private service:ProductsEditService,
    private serviceProduct:ProductsService,
    private router:Router,
    private serviceCategory:CategoriesService
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
    if(this.id) this.service.find(this.id).pipe(take(1)).subscribe(p => this.product = p);
  }

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
          this.list = result;
        },(error) => {
          console.error('Error fetching data:', error);
        }
      )
  },50)
  }

  submitForm(){
    if (this.loading) {
      return;
    }
    this.loading = true;
    if (this.validateForm.valid) {

        let operation$$ = this.serviceProduct.add(this.validateForm.value)
          operation$$.subscribe(
          (result: Product) => {
            this.loading = false;
            this.product = result;
            this.router.navigate(['./admin/products']);
          },
          (error: any) => {
            console.log(error);
          }
        );

      if (this.id) {
        let operation$ = this.service.edit({
          ...this.validateForm.value,
          id: this.id,
        });
        operation$.subscribe(
          (result: Product) => {
            this.loading = false;
            this.product = result;
            this.router.navigate(['./admin/products']);
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
      }
    }

  delete(id:string) {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.service.delete(id).subscribe(()=>{
      this.loading = false;
      this.router.navigate(['./admin/products']);
    });
  }
}
