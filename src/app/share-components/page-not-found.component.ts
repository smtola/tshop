import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-not-found',
  template:  `
    <nz-result nzStatus="404" nzTitle="404" nzSubTitle="Sorry, the page you visited does not exist.">
      <div nz-result-extra>
        <button nz-button nzType="primary" routerLink="/">Back Home</button>
      </div>
    </nz-result>
  `,
})
export class PangeNotFound implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
