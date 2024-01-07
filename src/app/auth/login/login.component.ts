import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  submitted: boolean = false;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.signinForm.controls;
  }
  ngOnInit() {}
  loginUser() {
    this.submitted = true;
    if (this.signinForm.invalid) {
      return;
    }
    this.authService
      .signIn(this.signinForm.value.email, this.signinForm.value.password)
      .subscribe((res: any) => {
        if (res) {
          localStorage.setItem('access-token', res.token);
          this.router.navigate(['/home'])
        }
      });
  }
}
