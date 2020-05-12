import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-object-table',
  templateUrl: './view-object-table.component.html',
  styleUrls: ['./view-object-table.component.scss']
})
export class ViewObjectTableComponent implements OnInit {

  constructor() { }

  @Input() list: any[];
  keys: string[];

  ngOnInit(): void {
    this.keys = Object.keys(this.list);
  }

}
