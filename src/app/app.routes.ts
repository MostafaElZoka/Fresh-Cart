import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LoginComponent } from './Components/login/login.component';

export const routes: Routes = [
    {path:"", component:AuthLayoutComponent, 
        children:[
        {path:'', redirectTo:'login', pathMatch:'full'},
        {path:'login', component:LoginComponent},
        {path:'register', loadComponent: () => import('./Components/register/register.component').then(m => m.RegisterComponent)},
    ]
    },
    {path:"", component:BlankLayoutComponent, 
        children:[
        {path:'', redirectTo:'home', pathMatch:'full'},
        {path:'home', loadComponent: () => import('./Components/home/home.component').then(m => m.HomeComponent)},
        {path:'brands', loadComponent: () => import('./Components/brands/brands.component').then(m => m.BrandsComponent)},
        {path:'categories', loadComponent: () => import('./Components/categories/categories.component').then(m => m.CategoriesComponent)},
        {path:'products', loadComponent: () => import('./Components/product/product.component').then(m => m.ProductComponent)},
        {path:'cart', loadComponent: () => import('./Components/cart/cart.component').then(m => m.CartComponent)}
]       
    },
    {path:"**", component:NotFoundComponent}
];
