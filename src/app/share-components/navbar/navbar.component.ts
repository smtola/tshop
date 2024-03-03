import {Component, OnInit} from '@angular/core';
import {AppUser, AuthLoginService} from "../../helpers/auth-login.service";

@Component({
  selector: 'app-navbar',
  template: `
      <nz-header nz-flex nzJustify="space-between" class="header">
        <div
        ><a nz-button nzType="link" routerLink="./" class="logoStyle">Tshop</a></div>
        <div>
            <div>
              <ul nz-menu nzMode="horizontal" nz-flex style="margin: 0">
                  <li nz-menu-item style="margin: 0">
                    <nz-badge nzSize="small" [nzCount]="5">
                      <a nz-button nzType="link" routerLink="./shopping-cart" style="color:#ccc;">
                        <span nz-icon nzType="shopping-cart" nzTheme="outline"></span>
                      </a>
                    </nz-badge>
                  </li>
                  <ng-template #anonymousUser>
                    <li nz-menu-item><a nz-button nzType="link" routerLink="./login" style="color:#ccc;">
                      <span nz-icon nzType="login" nzTheme="outline"></span>
                      Log in
                    </a></li>
                  </ng-template>
                  <li nz-menu-item *ngIf="appUser; else anonymousUser" style="margin: 0">
                    <a nz-button nzType="link" nz-dropdown [nzDropdownMenu]="menu" style="color:#ccc;" >
                      <span nz-icon nzType="user" nzTheme="outline"></span>
                      {{appUser.name}}
                      <span nz-icon nzType="down"></span>
                    </a>
                    <nz-dropdown-menu #menu="nzDropdownMenu">
                      <ul nz-menu style="padding: 0 0;">
                        <li nz-menu-item>
                          <a nz-button nzType="link" routerLink="./my/orders">My Orders</a>
                        </li>
                        <ng-container *ngIf="appUser.isAdmin">
                          <li nz-menu-item>
                            <a nz-button nzType="link" routerLink="./admin/orders">Manage Order</a>
                          </li>
                          <li nz-menu-item>
                            <a nz-button nzType="link" routerLink="./admin/products">Manage Products</a>
                          </li>
                        </ng-container>
                        <li nz-menu-item>
                          <a nz-button nzType="link" (click)="logout()" >Log out</a>
                        </li>
                      </ul>
                    </nz-dropdown-menu>
                  </li>
              </ul>
            </div>
        </div>
      </nz-header>
  `,
  styles:[
    `
      .header{
        padding-left: 15px;
        padding-right: 15px;
      }
      .ant-layout-header .ant-menu {
        background: #001529;
        margin-top: 1px;
        line-height: inherit;
      }
      .ant-menu-horizontal > .ant-menu-item{padding:0;}
    `
  ]
})
export class NavbarComponent implements OnInit{
  appUser:AppUser;
  constructor(private auth:AuthLoginService){}
  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.auth.logout();
  }

}
