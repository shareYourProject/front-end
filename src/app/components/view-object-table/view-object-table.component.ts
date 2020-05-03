import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ADDRCONFIG } from 'dns';

@Component({
  selector: 'app-view-object-table',
  templateUrl: './view-object-table.component.html',
  styleUrls: ['./view-object-table.component.scss']
})
export class ViewObjectTableComponent implements OnInit {

  constructor() { }

  headers: string[];

  files: any[] = [
    {
      name: 'index.html',
      dateModification: new Date('August 19, 1975 13:15:30'),
      lastUser: 'Gérard D.'
    },
    {
      name: 'style.css',
      dateModification: new Date('August 20, 1975 16:40:30'),
      lastUser: 'Alain C.'
    },
    {
      name: 'code.js',
      dateModification: new Date('August 19, 1975 14:20:30'),
      lastUser: 'Jamel D.'
    },
    {
      name: 'photo_de_chat.png',
      dateModification: new Date('August 14, 1975 14:20:30'),
      lastUser: 'Christian C.'
    }
  ];

  getListArgument(obj: any[]): void{
    var headerTemp: string[] = [];
    for(var argument in obj[0]){
      headerTemp.push(argument);
    }
    this.headers = headerTemp;
  }

  ngOnInit(): void {
  }

}
