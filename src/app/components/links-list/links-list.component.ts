import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-links-list',
  templateUrl: './links-list.component.html',
  styleUrls: ['./links-list.component.scss']
})
export class LinksListComponent implements OnInit {
  @Input() links: Map<string, string>;

  constructor() { }

  ngOnInit(): void {
  }

}
