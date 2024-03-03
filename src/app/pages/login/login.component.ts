import { Component } from '@angular/core';
import {AuthLoginService} from "../../helpers/auth-login.service";

@Component({
  selector: 'app-login',
  template:`
        <div class="btn" nz-flex nzJustify="center" nzAlign="center">
          <button  nz-button nzType="primary" nzSize="large" nzShape="round" (click)="signInWithGoogle()">
            <span nz-icon nzType="google"></span>
            Sing with google account.
          </button>
        </div>
  `,
  styles: [`
    .btn{padding:30vh 0;}
  `]
})
export class LoginComponent {
  constructor(private service:AuthLoginService) {

  }

  signInWithGoogle(){
    this.service.login();
  }
}
