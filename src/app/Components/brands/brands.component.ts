import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../Core/Services/brands.service';
import { IBrand } from '../../Core/Interfaces/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{

  constructor(private _brandsService:BrandsService){}
  BrandsList:IBrand[] = [];
  
  ngOnInit(): void {
    this._brandsService.getAllBrands().subscribe({
      next: (res)=>{
        console.log(res);
        this.BrandsList = res.data;
      },
      error: (err) =>{
        console.log(err);
        
      }
    })
  }
}
