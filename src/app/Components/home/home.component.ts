import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Core/Services/product.service';
import { log } from 'console';
import { IProduct } from '../../Core/Interfaces/iproduct';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(private _productService:ProductService) { }
  productsList:IProduct[] = [];
  
  ngOnInit(): void {
    this._productService.getAllProducts().subscribe({
      next:(response) => {
        // console.log(response);
        this.productsList = response.data;
      },
      error:(err) => {
        console.log(err);
      }
    })
}
}
