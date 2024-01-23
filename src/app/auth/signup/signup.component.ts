import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
function emailValidator(control:AbstractControl):{[key:string]:any}|null{
  const email :string = control.value;
  if(email && !email.toLowerCase().endsWith('.com')){
    return {'invalidEmail':true}
  }
  return null
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted:boolean=false;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private toastr:ToastrService
  ) {
    this.signupForm = this.fb.group({
      name: ['',Validators.required],
      email: ['', [Validators.required,Validators.email,emailValidator]],
      password: ['', Validators.required],
    });
    this.signupForm.get('email')?.valueChanges.subscribe((email) => {
      this.checkEmailAvailability(email);
    });
   
  }
  get f(){
    return this.signupForm.controls;
  }
  ngOnInit() {}
  registerUser() {
    console.log(this.signupForm.value, this.signupForm.valid)
    this.submitted=true;
    if(this.signupForm.invalid){
      return
    }

    let data ={
      ...this.signupForm.value.email,
      ...this.signupForm.value.password
    }
    this.authService.signUp(this.signupForm.value).subscribe((res:any) => {
      if (res) {
        this.toastr.success('Signup Successfully.');
        // this.signupForm.reset();
        this.router.navigate(['login']);
      }
    });
  }

  isSignUp: boolean = true;
toggleSignUp() {
  this.isSignUp = !this.isSignUp;
}

onLogin(){
  this.router.navigate(['/login'])

}

hidePassword: boolean = true;

togglePasswordVisibility(): void {
  this.hidePassword = !this.hidePassword;
}

checkEmailAvailability(email: string): void {
  this.authService.checkEmailAvailability(email).subscribe((isAvailable) => {
    if (!isAvailable) {
      this.signupForm?.get('email')?.setErrors({ emailInUse: true });
      this.toastr.error('Email is already used. Try Another Email')
    }
 
  });
}
}
