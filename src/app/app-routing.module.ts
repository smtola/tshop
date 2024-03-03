import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {LoginComponent} from "./pages/login/login.component";
import {AdminProductComponent} from "./pages/admin/admin-product/admin-product.component";
import {ProductFormComponent} from "./pages/admin/product-form/product-form.component";
import {PangeNotFound} from "./share-components/page-not-found.component";
import {AuthGuardService} from "./helpers/auth-guard.service";
import {AuthGuardAdminService} from "./helpers/auth-guard-admin.service";
import {ShippingCartComponent} from "./pages/shipping-cart/shipping-cart.component";

const routes: Routes = [
  {
    path:'',
    component: WelcomeComponent
  },
  {
    path:'products',
    component: WelcomeComponent
  },
  { path: 'shopping-cart', component: ShippingCartComponent },
  {
    path:'login',
    component:LoginComponent
  },

  {
    path:'admin/products/new',
    component:ProductFormComponent,
    canActivate: [AuthGuardService, AuthGuardAdminService]
  },
  {
    path:'admin/products/:id',
    component:ProductFormComponent,
    canActivate: [AuthGuardService, AuthGuardAdminService]
  },
  {
    path:'admin/products',
    component:AdminProductComponent,
    canActivate: [AuthGuardService, AuthGuardAdminService]
  },
  {
    path:'**',
    component:PangeNotFound
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
