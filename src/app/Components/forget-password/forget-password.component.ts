import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { AuthService } from '../../Core/Services/auth.service';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  constructor(private _authService:AuthService,private _router:Router) { }

  step:number = 1;
  errorMsg:string = ''

  // goToStep() {
  //   this.step++;
  //   if(this.step > 3) {
  //     this.step = 1;
  //   }
  // }

  verifyEmailForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  verifyOTPForm:FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]{6}$')]),
  })

  newPasswordForm:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern('^[A-Z][a-z]+@[0-9]+$')]),
  })

  submitVerifyEmailForm() {
    if(this.verifyEmailForm.valid) {
      this._authService.verifyEmail(this.verifyEmailForm.value).subscribe({
        next:(response)=>{
          if(response.statusMsg == "success")
          {
            this.step = 2;
            this.newPasswordForm.controls['email'].setValue(this.verifyEmailForm.controls['email'].value); //to set email in newPasswordForm from verifyEmailForm
          }
    },
        error:(err)=>{
          console.log(err);
          this.errorMsg = err.error.message
        }
      })
    }
  }

  submitVerifyOTPForm() {
    if(this.verifyOTPForm.valid) {
      this._authService.verifyOTP(this.verifyOTPForm.value).subscribe({
        next:(response)=>{
          if(response.status == "Success")
          {
            this.step = 3;
          }
    },
        error:(err)=>{
          console.log(err);
          this.errorMsg = err.error.message
        }
      })
    }
  }

    submitVerifyResetPasswordForm() {
    if(this.newPasswordForm.valid) {
      this._authService.resetPassword(this.newPasswordForm.value).subscribe({
        next:(response)=>{
          console.log(response);
            localStorage.setItem("userToken", response.token);
            //decode token to get user data
            this._authService.decodeToken();
            //set user login status to true
            this._authService.setLoggedIn(true);
            //navigate to home page
            this._router.navigate(['/home']);
          
    },
        error:(err)=>{
          console.log(err);
          this.errorMsg = err.error.message
        }
      })
    }
  }
}
