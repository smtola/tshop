import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from '@angular/fire/auth';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, switchMap, of, map} from "rxjs";
import firebase from "firebase/compat";
import {UserService} from "../user.service";
export interface AppUser {
  name?: string;
  email?: string;
  isAdmin?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  user$: Observable<firebase.User>;
  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user$ = afAuth.authState;
  }

  login(){
    this.afAuth.signInWithRedirect(new GoogleAuthProvider())
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || './';
    localStorage.setItem('returnUrl', returnUrl);
    this.router.navigate(['./']);
  }

  logout() {
    this.afAuth.signOut();
    localStorage.removeItem('returnUrl');
    this.router.navigate(['./']);
  }

  get appUser$() : Observable<AppUser> {
    return this.user$
      .pipe(switchMap(user => {
        if (user) return this.userService.get(user.uid);

        return of(null);
      }));
  }
}
