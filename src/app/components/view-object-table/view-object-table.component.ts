import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-object-table',
  templateUrl: './view-object-table.component.html',
  styleUrls: ['./view-object-table.component.scss']
})
export class ViewObjectTableComponent implements OnInit {

  constructor() { }

  headers: string[];
  arguments: string[];
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

  getEveryArguments(obj: any): string[]{
    var argumentsTemp: string[] = [];
    for(var arg in obj){
      argumentsTemp.push(arg);
      console.log()
    }
    return argumentsTemp;
  }

  setTable(objects: any[], argumentsWanted: string[] = null, headers: string[] = null): void{
    this.headers = headers;
    this.listObj = objects;
    this.arguments = argumentsWanted;
    if(!argumentsWanted){
      this.arguments = this.getEveryArguments(objects[0]);
    }
    if(!headers){
      this.headers = this.arguments;
    }
  }

  ngOnInit(): void {
    this.setTable(this.files,['name','lastUser'],['Nom du fichier','Dernier utilisateur']);
  }

}
