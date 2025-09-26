import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Core/Services/product.service';
import { IProduct } from '../../Core/Interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../Core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../Core/pipes/search.pipe';

@Component({
  selector: 'app-product',
  imports: [ RouterLink, FormsModule, SearchPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  constructor(private _productService:ProductService, private _cartService:CartService, private _toastrService:ToastrService) {}
  productsList:IProduct[] = [];
  searchText = ""
  getProducts(){
    this._productService.getAllProducts().subscribe({ //to get all products
      next:(response) => {
        // console.log(response);
      this.productsList = response.data;
      },
      error:(err) => {
        console.log(err);
      }
    })
  }
  itemsQuantity=0;
  ngOnInit(): void {
    this.getProducts();
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
