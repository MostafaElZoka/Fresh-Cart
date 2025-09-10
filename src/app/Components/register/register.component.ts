import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { response } from 'express';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errorMsg:string = ''
  constructor(private _authService:AuthService) { }

  registerForm = new FormGroup({
    name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern('^[A-Z][a-z]+@[0-9]+$'), Validators.required]),
    rePassword: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.pattern('^01[0125][0-9]{8}$'), Validators.required])
  }, this.confirmPassword)


  submitRegisterForm() {
    if(this.registerForm.valid) {
      this._authService.register(this.registerForm.value).subscribe({
        next:(response)=>{
          console.log(response);
        },
        error:(err)=>{
          this.errorMsg = err.error.message
          console.log(err);
        }
      })
    }
  }

  confirmPassword(g:AbstractControl) 
  {
    if(g.get('password')?.value === g.get('rePassword')?.value) {
      return null
    }
    return {mismatched:true}
  }
}
