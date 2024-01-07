import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

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
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
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
    this.authService.signUp(this.signupForm.value).subscribe((res:any) => {
      if (res) {
        this.toastr.success('Signup Successfully.');
        // this.signupForm.reset();
        this.router.navigate(['login']);
      }
    });
  }
}
