import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-object-table',
  templateUrl: './view-object-table.component.html',
  styleUrls: ['./view-object-table.component.scss']
})
export class ViewObjectTableComponent implements OnInit {

  constructor() { }

  public headers: string[];
  public arguments: string[];
  public listObj: any[];

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
  }

}
