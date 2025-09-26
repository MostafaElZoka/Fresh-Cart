import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Core/Services/product.service';
import { IProduct } from '../../Core/Interfaces/iproduct';
import { CartService } from '../../Core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  constructor(private _activatedRoute:ActivatedRoute, private _toastrService:ToastrService, private productService:ProductService,private _cartService:CartService) { }

  product:IProduct | null = null;
  itemsQuantity = 0;
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next:(param) =>{
        let id = param.get('id');
        console.log(id);
        if(id != null){
          this.productService.getProductById(id).subscribe({
            next:(response) =>{
              console.log(response.data);
              this.product = response.data;
            }
          })
        }
      }
    })
  }

    addItemToCart(id:string){
    this._cartService.addItemToCart(id).subscribe({
      next: (res)=>{
        console.log(res);
        this._toastrService.success("Item added to cart successfully","Success")
        // this._cartService.itemsCount.next(response.numOfCartItems);//i am taking the count and adding it to the data stream        
        this.itemsQuantity = res.data.products.reduce( (acc:number,prd:any) => {
          return acc + prd.count
        }, 0 )
        this._cartService.itemsCount.next(this.itemsQuantity);
      },
      error:(err) => {
        console.log(err);
        this._toastrService.error(err.error.message);
      }
    })
  }
}
