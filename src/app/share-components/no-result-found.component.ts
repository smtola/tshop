import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'no-result-found',
  template:  `
    <div class="container">
      <h5 style="font-size: 36px; margin-bottom: 6px;">
        <i  nz-icon nzType="file-search" nzTheme="outline"></i>
      </h5>
      <h5>RowNotFound</h5>
    </div>
  `,
  styles: [`
    .container {
        text-align: center;
        padding: 24px 0px;
    }
  [nz-icon] {
    color: #adacac;
  }
  `]
})
export class NoResultFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
