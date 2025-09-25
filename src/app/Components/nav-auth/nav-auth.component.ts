import { Component, Input, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Core/Services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CartService } from '../../Core/Services/cart.service';

@Component({
  selector: 'app-nav-auth',
  imports: [RouterLink, RouterLinkActive, CommonModule, AsyncPipe],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.scss'
})
export class NavAuthComponent implements OnChanges, OnInit{
  constructor(public _authService:AuthService, private _cartService:CartService) 
  {
    this.LoggedIn = this._authService.currentLoggedIn$;
   }

   cartItemsCount$!:Observable<number>;
   quantity = 0;
  // @Input() LoggedIn!: boolean;
  LoggedIn: Observable<boolean>;
  ngOnInit(): void {
    this._cartService.getCartItems().subscribe({
      next: (res) =>{
        this.quantity = res.data.products.reduce( (acc:number, prd:any) =>{
          return acc + prd.count
        },0 );
        this._cartService.itemsCount.next(this.quantity);
      }
    })
    this.cartItemsCount$ = this._cartService.itemsCount.asObservable();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['LoggedIn']) {
      console.log('LoggedIn changed:', changes['LoggedIn'].currentValue);
  }
}
}

