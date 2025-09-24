import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CheckOutService } from '../../Core/Services/check-out.service';

@Component({
  selector: 'app-order-info',
  imports: [ReactiveFormsModule],
  templateUrl: './order-info.component.html',
  styleUrl: './order-info.component.scss'
})
export class OrderInfoComponent implements OnInit{
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _checkOutService = inject(CheckOutService);
  shippingAddress:FormGroup = new FormGroup({
    details: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl(''),
  });

  cartId: string | null = '';

  ngOnInit(): void {
    this.cartId = this._activatedRoute.snapshot.paramMap.get('id');//used to get cart id from url 
  }

  confirmOrder(){
    console.log(this.shippingAddress.value);

    this._checkOutService.checkout(this.cartId || '',this.shippingAddress.value).subscribe({
      
      next:(response)=>{
        console.log(response);
        window.location.href = response.session.url; // redirect to payment gateway
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
