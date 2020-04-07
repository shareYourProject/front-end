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

  _isLogged$;

  public isLogged: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log("watch dog init");
    this._isLogged$ = this.authService.isLogged().subscribe(isLogged => this.isLogged = isLogged);
  }

  ngOnDestroy(): void {  }

}
