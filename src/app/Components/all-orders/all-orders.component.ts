import { Component, OnInit } from '@angular/core';
import { CheckOutService } from '../../Core/Services/check-out.service';
import { IProduct } from '../../Core/Interfaces/iproduct';
import { ICartItem,  } from '../../Core/Interfaces/iorder-item';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit {
  constructor(private _checkOutService:CheckOutService){}

  orderItems:ICartItem[] = []

  ngOnInit(): void {
    this._checkOutService.getUserOrderes().subscribe({
      next:(res) =>{
        console.log(res)
        this.orderItems = res
      },
      error: (err)=>{
        console.log(err);
      }
    }
  )
  }
}
