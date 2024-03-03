import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'filter-search',
  templateUrl: './filter-search.component.html',
})
export class FilterSearchComponent implements OnInit{
  @Input() value: string="";
  @Input() storageKey: string="";
  @Input() placeholder!: string;
  @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>();
  filterTextChanged(): void {
    this.filterChanged.emit(this.value);
  }
  ngOnInit(): void {
  }
}
