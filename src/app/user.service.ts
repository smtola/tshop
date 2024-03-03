import { Injectable } from '@angular/core';
import firebase from "firebase/compat";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AppUser} from "./helpers/auth-login.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    }).then(r => console.log(r));
  }

  get(uid: string): Observable<AppUser> {
    return this.db.object('/users/' + uid).valueChanges();
  }
}
