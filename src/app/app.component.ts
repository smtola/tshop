import { Component } from '@angular/core';
import {UserService} from "./user.service";
import {AuthLoginService} from "./helpers/auth-login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    .navbar-app{
      position: -webkit-sticky; /* Safari */
      position: sticky;
      height: auto;
      top: 0;
      z-index: 2;
    }
    .content-app{
      overflow-x: hidden;
    }
  `]
})
export class AppComponent {
  constructor(private userService:UserService, private auth:AuthLoginService,router:Router) {
    auth.user$.subscribe(user =>{
      if(!user)return;
      if(user){
        userService.save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        if(!returnUrl)return;

        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    })
  }
}
