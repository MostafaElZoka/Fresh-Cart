import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClinet:HttpClient) { }

  getAllProducts():Observable<any>
  {
    return this._httpClinet.get(`${environment.baseUrl}/api/v1/products`)
  }

  getProductById(id:string):Observable<any>
  {
    return this._httpClinet.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }
}
