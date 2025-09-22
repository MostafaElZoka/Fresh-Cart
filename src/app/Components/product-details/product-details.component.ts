import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Core/Services/product.service';
import { IProduct } from '../../Core/Interfaces/iproduct';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  constructor(private _activatedRoute:ActivatedRoute, private productService:ProductService) { }

  product:IProduct | null = null;

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
}
