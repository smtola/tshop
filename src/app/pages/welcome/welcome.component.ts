import { Component, OnInit } from '@angular/core';
import {Product, ProductsService} from "../admin/admin-product/products.service";
import {QueryParam} from "../../helpers/base-api.service";
import {switchAll, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-welcome',
  template: `
    <nz-carousel nzAutoPlay>
      <div nz-carousel-content *ngFor="let carousel of list;">
        <img
          class="slider"
          nz-image
          [nzSrc]="carousel.imageUrl"
          alt=""
        />
      </div>
    </nz-carousel>

    <div nz-row>
      <div nz-col nz-col nzFlex="auto">
        <nz-layout class="layout" >
          <nz-content>
            <div class="inner-content">
              <div class="content-wrappers">
                <nz-spin nzSimple *ngIf="loading"></nz-spin>
                <ng-container *ngFor="let p of list;index as i;">
                  <nz-card [nzCover]="coverTemplate" [nzTitle]="centent" [nzExtra]="btn">
                  </nz-card>
                  <ng-template #coverTemplate >
                    <img alt="example" style="height:230px;border-radius: 4px;" [src]="p.imageUrl" />
                  </ng-template>
                  <ng-template #btn >
                  <button nz-button nzType="primary">Add to Cart</button>
                  </ng-template>
                  <ng-template #centent >
                    <b >{{p.title}}</b>
                    <b style="margin:0 1rem;">{{p.price | currency:'USD':true}}</b>
                  </ng-template>
                  <div *ngIf="(i+1) % 2 === 0"></div>
                </ng-container>
              </div>
            </div>
            <nz-footer>©2024 Implement By SOMTOLA</nz-footer>
          </nz-content>
        </nz-layout>
      </div>
    </div>

  `,
  styles: [
    `
      [nz-carousel-content] {
        text-align: center;
        height: 160px;
        line-height: 160px;
        color: #fff;
        overflow: hidden;
        transition: all .5s ease;
      }
      .slider{
        width:100%;
        height:1000px;
        transition: all .5s ease;
      }
      .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
      }

      .trigger:hover {
        color: #1890ff;
      }

      .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
      }

      nz-header {
        background: #fff;
        padding: 0;
      }
      .nz-sider{
        min-height: 500px;
        max-width: 50px;
        min-width: 50px;
      }
      nz-content {
        margin: 0;
      }

      .inner-content {
        padding: 24px;
        background: #fff;
      }

      nz-footer {
        text-align: center;
      }
      .content-wrappers{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        row-gap:1rem;
        column-gap: 0;
        transition: all .5s ease;
      }
      nz-card{
        border-radius: 4px;
        width:400px;height: 296px;
      }

      @media screen and (max-width: 485px) {
        .content-wrappers{
          gap:1rem;
        }
      }
      @media screen and (min-width: 865px) {
        .content-wrappers{
          gap:1rem;
        }
      }
      @media screen and (min-width: 1280px) {
        .content-wrappers{
          gap:1rem;
        }
      }
    `
  ]
})
export class WelcomeComponent implements OnInit {

  loading = false;
  list:Product []  = [];
  param:QueryParam ={};
  category: string;
  constructor(private service:ProductsService, private route:ActivatedRoute) {

  }

  ngOnInit() {
    this.search();
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
          return this.route.queryParamMap;
        },(error:any)=>{
          this.loading = false;
          console.log(error);
        }
      )
    },50)
  }

}
