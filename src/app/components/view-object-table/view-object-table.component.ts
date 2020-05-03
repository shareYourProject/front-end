import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-object-table',
  templateUrl: './view-object-table.component.html',
  styleUrls: ['./view-object-table.component.scss']
})
export class ViewObjectTableComponent implements OnInit {

  constructor() { }

  headers: string[];
  listObj: any[];

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

  getArguments(obj: any): string[]{
    var headerTemp: string[] = [];
    for(var argument in obj){
      headerTemp.push(argument);
    }
    return headerTemp;
  }

  setHeaders(listString: string[]): void{
    this.headers = listString;
  }

  setListObj(listObjTemp: any[]): void{
    this.listObj = listObjTemp;
    this.listObj.forEach(element => {
      for(var argument in element){
        let type = typeof argument;
        console.log(type);
      }
    });
  }

  setTable(listObjTemp: any[]): void{
    var headersTemp = this.getArguments(listObjTemp[0]);
    this.headers = headersTemp;
    this.setListObj(listObjTemp);
  }

  ngOnInit(): void {
    this.setTable(this.files);
  }

}
