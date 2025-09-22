import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../Core/Services/product.service';
import { log } from 'console';
import { IProduct } from '../../Core/Interfaces/iproduct';
import { CategoryService } from '../../Core/Services/category.service';
import { ICategory } from '../../Core/Interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{
  constructor(private _productService:ProductService, private _categoryService:CategoryService) { }
  productsList:IProduct[] = [];
  categoriesList:ICategory[] = [];

  private productsSubscription:any;
  
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
  ngOnDestroy(): void {
    this.productsSubscription?.unsubscribe(); //to avoid memory leak
  }
}
