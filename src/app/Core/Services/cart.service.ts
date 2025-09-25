import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../Environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private _httpClient: HttpClient) 
  {
    // if(isPlatformBrowser(platformId))
    // {
    // this.myHeaders =  {  headers: { 'token': localStorage.getItem("userToken") || '' }}
    // }
  }
  
  // myHeaders = {  }
  itemsCount= new BehaviorSubject<number>(0);
  
  addItemToCart(id:string):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        productId:id
      },
    // {
    //   headers: this.myHeaders.headers
    // })
    )
  }

  getCartItems():Observable<any>{
    return this._httpClient.get(`${environment.baseUrl}/api/v1/cart`)
  }

  removeItemFromCart(id:string):Observable<any>{
    return this._httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`)
  }

  changeItemCount(id:string,count:number):Observable<any>{
    return this._httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        count: count
      },
      // {
      //   headers: this.myHeaders.headers
      // }
    )
  }

  clearCart():Observable<any>{
    return this._httpClient.delete(`${environment.baseUrl}/api/v1/cart`)
  }
}
