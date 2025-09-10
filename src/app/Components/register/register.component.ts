import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern('^[A-Z][A-Za-z0-9]{5,10}$'), Validators.required]),
    rePassword: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.pattern('^01[0125][0-9]{8}$'), Validators.required])
  }, this.confirmPassword)

  submitRegisterForm() {
    if(this.registerForm.valid) {
    console.log(this.registerForm);
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
