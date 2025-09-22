import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Core/Services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(private _formBuilder:FormBuilder,private _router:Router, private _authService:AuthService) { }

  loginForm!:FormGroup
  errorMsg:string = ''

  submitLoginForm() { //to submit the form
    if(this.loginForm.valid) {
      this._authService.login(this.loginForm.value).subscribe({
        next:(response)=>{
          if(response.message == "success")
          {
            //store token in local storage
            localStorage.setItem("userToken", response.token);
            //decode token to get user data
            this._authService.decodeToken();
            //set user login status to true
            this._authService.setLoggedIn(true);
            //navigate to home page
            this._router.navigate(['/home']);
          }
          console.log(response);
        },
        //show error message from backend if any
        error:(err)=>{
          this.errorMsg = err.error.message
          console.log(err);
        }
      })
    }
  }

  ngOnInit(): void {
  this.loginForm = this._formBuilder.group({
    email: [''],
    password: ['']
  })
  }

}
