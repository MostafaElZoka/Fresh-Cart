import { Routes } from '@angular/router';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { LoginComponent } from './Components/login/login.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { authGuardGuard } from './Core/Guards/auth-guard.guard';
import { guestGuard } from './Core/Guards/guest.guard';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';

export const routes: Routes = [
    {path:"", canActivate:[guestGuard] 
        ,component:AuthLayoutComponent, 
        children:[
        {path:'', redirectTo:'login', pathMatch:'full'},
        {path:'login', component:LoginComponent},
        {path:'register', loadComponent: () => import('./Components/register/register.component').then(m => m.RegisterComponent)},
        {path:'forgetPassword', component:ForgetPasswordComponent},

    ]
    },
    {path:"", component:BlankLayoutComponent, canActivate:[authGuardGuard],
        children:[
        {path:'', redirectTo:'home', pathMatch:'full'},
        {path:'home', loadComponent: () => import('./Components/home/home.component').then(m => m.HomeComponent)},
        {path:'brands', loadComponent: () => import('./Components/brands/brands.component').then(m => m.BrandsComponent)},
        {path:'categories', loadComponent: () => import('./Components/categories/categories.component').then(m => m.CategoriesComponent)},
        {path:'products', loadComponent: () => import('./Components/product/product.component').then(m => m.ProductComponent)},
        {path:'cart', loadComponent: () => import('./Components/cart/cart.component').then(m => m.CartComponent)},
        {path:'details/:id', loadComponent: () => import('./Components/product-details/product-details.component').then(m => m.ProductDetailsComponent)},
        {path:'orderInfo/:id', loadComponent: () => import('./Components/order-info/order-info.component').then(m => m.OrderInfoComponent)},
        {path:'allorders', loadComponent: () => import('./Components/all-orders/all-orders.component').then(m => m.AllOrdersComponent)},
        ]       
    },
    {path:"**", component:NotFoundComponent}
];
