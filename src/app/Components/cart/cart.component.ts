import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../Core/Services/cart.service';
import { ICart } from '../../Core/Interfaces/icart';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, FormsModule, RouterLink, AsyncPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly _cartService = inject(CartService);
  private readonly _toastr = inject(ToastrService);
  cartDetails:ICart = {} as ICart;
  itemsQuantity =0;
  qtyStream! : Observable<any>
  getCart(){
    this._cartService.getCartItems().subscribe({
      next:(response)=>{
        console.log(response.data);
        this.cartDetails = response.data;

        this.itemsQuantity = this.cartDetails.products.reduce( (acc, item)=> {
        return  acc + item.count
        }, 0);


        this._cartService.itemsCount.next(this.itemsQuantity);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
  ngOnInit(): void {
    this.getCart();
    this.qtyStream = this._cartService.itemsCount.asObservable();

  }

  removeItem(id:string){
    this._cartService.removeItemFromCart(id).subscribe({
      next:(response)=>{
        console.log(response);
        // this.getCart();// to refresh cart items after removing an item
        this.cartDetails = response.data; // update cart details directly from response
        this._toastr.success("Item removed from cart successfully");
        this._cartService.itemsCount.next(response.numOfCartItems);

      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  incrementCount(id:string, currentCount:number){
    this._cartService.changeItemCount(id,currentCount + 1).subscribe({
      next:(response)=>{
        console.log(response);
        // this.getCart();// to refresh cart items after changing count
        this.cartDetails = response.data; // update cart details directly from response
        this.itemsQuantity = this.cartDetails.products.reduce( (acc, item)=> {
        return  acc + item.count
        }, 0);
        this._cartService.itemsCount.next(this.itemsQuantity);

      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  decrementCount(id:string, currentCount:number){
    if(currentCount > 1){
      this._cartService.changeItemCount(id,currentCount - 1).subscribe({
        next:(response)=>{
          console.log(response);
          // this.getCart();// to refresh cart items after changing count
          this.cartDetails = response.data; // update cart details directly from response
          this.itemsQuantity = this.cartDetails.products.reduce( (acc, item)=> {
          return  acc + item.count
            }, 0);
          this._cartService.itemsCount.next(this.itemsQuantity);
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }
    else{
      this.removeItem(id);

    }
  }

  clearCart(){
    if(confirm("Are you sure you want to clear the cart?"))
    {
      this._cartService.clearCart().subscribe({
        next:(response)=>{
          console.log(response);
          this.cartDetails = { } as ICart; // Clear cart details
          this._toastr.success("Cart cleared successfully");
          this._cartService.itemsCount.next(0);
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }
    return;
  }
}
