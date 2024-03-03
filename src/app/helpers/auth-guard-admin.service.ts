import { Injectable } from '@angular/core';
import { Router} from "@angular/router";
import {AuthLoginService} from "./auth-login.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService {
  constructor(private auth: AuthLoginService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
      .pipe(map(appUser => appUser.isAdmin))
  }
}
