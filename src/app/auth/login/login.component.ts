import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  signinForm!: FormGroup;
  submitted: boolean = false;

  oldPassword: string = '';
  newPassword: string = '';
  showChangePasswordForm: boolean = false;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public toastr:ToastrService,
    private spinner: NgxSpinnerService
  ) {
    
  }

  get f() {
    return this.signinForm.controls;
  }
  ngOnInit() {

    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.spinner.show();

    setTimeout(() => {
      
      this.spinner.hide();
    }, 5000);
  }
  // loginUser() {
  //   this.submitted = true;
  //   if (this.signinForm.invalid) {
  //     return;
  //   }
  //   this.authService
  //     .signIn(this.signinForm.value.email, this.signinForm.value.password)
  //     .subscribe((user: any) => {
  //       if (user) {
  //         this.toastr.success('Logged In suceesfull')
  //         // localStorage.setItem('access-token', user.token); // Assuming your user object has a 'token' property
  //         this.router.navigate(['/home']);
  //       } else {
  //         this.toastr.error('Unauthorized User')
  //         // Handle case where email and password do not match
  //         console.log('Invalid email or password');
  //       }
  //     });
  // }

  loginUser() {
    this.submitted = true;
    if (this.signinForm.invalid) {
      return;
    }
    console.log('Form Value:', this.signinForm.value);
    
  
    
  
    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;
  
    console.log('Email:', email, 'Password:', password);
  
    this.authService.getUserByEmailAndPasword(email, password).subscribe(
      (users: any[]) => {
        console.log('API Response:', users);
  
        if (users.length > 0) {
          console.log('Logged In successfully:', users[0]);
          this.toastr.success('Logged In');
          this.router.navigate(['/home'])
        } else {
          console.log('Login failed. Invalid Credentials:', users);
          this.toastr.error('Invalid Credentials');
        }
      },
      (error: any) => {
        console.error('Error:', error);
        this.toastr.error('Error occurred while logging in');
      }
    );
  }

  onsignUp(){
    this.router.navigate(['/'])
  }

  onForgetPassword() {
    const username = this.signinForm.value.email; 
    const newPassword = 'newPassword'; // Replace with the new password entered by the user

    this.authService.getUserByUsername(username).subscribe(
      (user: any) => {
        if (user) {
          // Update the user's password
          this.authService.updateUserPassword(user.id, newPassword).subscribe(
            (response: any) => {
              console.log(response);

              // Password updated successfully, implement your login logic here
              this.loginWithNewPassword(username, newPassword);
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          console.log(`User with username ${username} not found.`);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loginWithNewPassword(username: string, newPassword: string) {
 
    console.log(`Login with username: ${username} and new password: ${newPassword}`);
  }

  onLoginClick(){
    
    this.spinner.show(undefined, { type: 'three-bounce' });
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }
  
}
