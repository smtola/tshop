import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot} from "@angular/router";
import {AuthLoginService} from "./auth-login.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private auth: AuthLoginService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(map(user => {
      if (user) return true;

      this.router.navigate(['./login'], { queryParams: { returnUrl: state.url }});
      return false;
    }))
  }
}
