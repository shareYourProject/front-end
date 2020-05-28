import { Component, OnInit, Input } from '@angular/core';
import { LinkData } from 'src/app/models/api/LinkData';

@Component({
  selector: 'app-links-list',
  templateUrl: './links-list.component.html',
  styleUrls: ['./links-list.component.scss']
})
export class LinksListComponent implements OnInit {
  @Input() links: LinkData[];

  constructor() { }

  ngOnInit(): void {
  }

}
