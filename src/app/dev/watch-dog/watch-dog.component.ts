import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import  { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@Component({
  selector: 'app-watch-dog',
  templateUrl: './watch-dog.component.html',
  styleUrls: ['./watch-dog.component.scss']
})
@AutoUnsubscribe()
export class WatchDogComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void { }

  ngOnDestroy(): void {  }

}
