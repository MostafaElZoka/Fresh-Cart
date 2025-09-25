import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../Core/Services/category.service';
import { ICategory } from '../../Core/Interfaces/icategory';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  constructor(private _cateogoryService:CategoryService){}

  categoryList:ICategory[] = [];

  ngOnInit(): void {
    this._cateogoryService.getAllCategories().subscribe({
      next: (res) =>{
        console.log(res);
        this.categoryList = res.data;
      },
      error: (err) =>{
        console.log(err);
      }
    });

    // this._cateogoryService.getCategoryById("6439d5b90049ad0b52b90048").subscribe(res => {
    //   console.log(res);
      
    // })
  }
}
