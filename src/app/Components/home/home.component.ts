import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../Core/Services/product.service';
import { log } from 'console';
import { IProduct } from '../../Core/Interfaces/iproduct';
import { CategoryService } from '../../Core/Services/category.service';
import { ICategory } from '../../Core/Interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../Core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../Core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Core/Services/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{
  constructor(private _productService:ProductService,
              private _categoryService:CategoryService,
              private _cartService:CartService,
              private _toastrService:ToastrService,
              private _authService:AuthService
              ) { }


  productsList:IProduct[] = [];
  categoriesList:ICategory[] = [];
  searchText:string = '';
  itemsQuantity =0;
  private productsSubscription !:Subscription;
  
  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    items: 1,
    nav: true
  }

    customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  ngOnInit(): void {
    this._authService.decodeToken();
    console.log(this._authService.userData);
    console.log("asksakd");
    
     this.productsSubscription = this._productService.getAllProducts().subscribe({ //to get all products
      next:(response) => {
        // console.log(response);
        this.productsList = response.data;
      },
      error:(err) => {
        console.log(err);
      }
    })

    this._categoryService.getAllCategories().subscribe({ //to get all categories
      next:(response) => {
        console.log(response);
        this.categoriesList = response.data;
      },
      error:(err) => {
        console.log(err);
      }
    })
  }
  addToCart(id:string){ 
    this._cartService.addItemToCart(id).subscribe({
      next:(response) => {
        console.log(response);
        this._toastrService.success("Item added to cart successfully","Success")
        // this._cartService.itemsCount.next(response.numOfCartItems);//i am taking the count and adding it to the data stream        
        this.itemsQuantity = response.data.products.reduce( (acc:number,prd:any) => {
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

  ngOnDestroy(): void {
    this.productsSubscription?.unsubscribe(); //to avoid memory leak
  }
}
