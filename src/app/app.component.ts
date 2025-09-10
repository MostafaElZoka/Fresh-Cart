import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./Components/footer/footer.component";
import { NavBlankComponent } from "./Components/nav-blank/nav-blank.component";
import { NavAuthComponent } from "./Components/nav-auth/nav-auth.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavBlankComponent, NavAuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FreshCart';
  isLoggedIn = false;
}
