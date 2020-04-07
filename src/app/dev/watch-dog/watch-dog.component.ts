import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-watch-dog',
  templateUrl: './watch-dog.component.html',
  styleUrls: ['./watch-dog.component.scss']
})
export class WatchDogComponent implements OnInit {

  public isLogged: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    console.log("watch dog init");

    
  }

}
