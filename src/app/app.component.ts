import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./Components/footer/footer.component";
import { NavAuthComponent } from "./Components/nav-auth/nav-auth.component";
import { AuthService } from './Core/Services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavAuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  constructor(private _authService:AuthService) {}
  title = 'FreshCart';
  // isLoggedIn = false;
  //check if user is logged in on app load
  ngOnInit(): void {
  // this.isLoggedIn = this._authService.checkLogin();    
  }
}
