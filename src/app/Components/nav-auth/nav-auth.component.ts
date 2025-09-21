import { Component, Input, input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Core/Services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-auth',
  imports: [RouterLink, RouterLinkActive, CommonModule, AsyncPipe],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.scss'
})
export class NavAuthComponent implements OnChanges{
  constructor(public _authService:AuthService) 
  {
    this.LoggedIn = this._authService.currentLoggedIn$;
   }
  // @Input() LoggedIn!: boolean;
  LoggedIn: Observable<boolean>;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['LoggedIn']) {
      console.log('LoggedIn changed:', changes['LoggedIn'].currentValue);
  }
}
}

