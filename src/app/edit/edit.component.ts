import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  itemId:any;
  item:any;
  employeeForm!: FormGroup;
  submitted=false;
  constructor(private service:DataService, private activatedRouter:ActivatedRoute, private fb:FormBuilder,private router:Router,private toastr:ToastrService){

  }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((params) => {
      this.itemId = params.get('id'); // Convert the ID to a number (if it's not a string)
      this.getDataForEdit(this.itemId);

      this.service.getDataForSpecificID(this.itemId).subscribe((item:any)=>{
        this.item=item;
        
      })
    });

    this.employeeForm = this.fb.group({
      department: ['', Validators.required],
      empName: ['', Validators.required],
      mobile: ['', Validators.required],
      gender: ['', Validators.required],
      joinDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', Validators.required],
      password: ['', Validators.required],
      confirmPass: ['', Validators.required],
      empStatus: ['', Validators.requiredTrue]
    });

    this.employeeForm.get('email')?.valueChanges.subscribe((email) => {
      if (this.employeeForm.get('email')?.dirty) {
        this.checkEmailAvailability(email);
      }
    });
    this.employeeForm.get('mobile')?.valueChanges.subscribe((mobile) => {
      if (this.employeeForm.get('mobile')?.dirty) {
        this.checkMobileAvailability(mobile);
      }
    });
    
  };
  get f() {
    return this.employeeForm.controls;
  }
  

  onUpdate(){
    Swal.fire({
      title: 'Update Confirmation',
      text: 'Are you sure you want to update this data?',
      icon: 'info',  // You can use 'question' or any other icon for update confirmation
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.updateData(this.itemId, this.employeeForm.value).subscribe((res: any) => {
          if (res) {
            this.router.navigate(['/add'])
            Swal.fire(
              'Updated!',
              'The data has been updated.',
              'success'
            );
            
          } else {
            Swal.fire(
              'Error',
              'Unable to update the data.',
              'error'
            );
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Not updated',
          'The data remains unchanged.',
          'info'
        );
      }
    });
  }

 

  getDataForEdit(id: number): void {
    this.service.getDataForSpecificID(id).subscribe((data) => {
      this.employeeForm.patchValue(data);
    });
  }
  keyPressNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  goBack(): void {
    this.router.navigate(['/add'])
  }

  checkEmailAvailability(email: string): void {
    this.service.checkEmailAvailability(email).subscribe((isAvailable) => {
      if (!isAvailable) {
        this.employeeForm?.get('email')?.setErrors({ emailInUse: true });
        this.toastr.error('Email is already used. Try Another Email')
      }
   
    });
  }

  checkMobileAvailability(mobile: string): void {
    this.service.checkMobileAvailability(mobile).subscribe((isAvailable) => {
      if (!isAvailable) {
        this.employeeForm?.get('mobile')?.setErrors({ mobile: true });
        this.toastr.error('Mobile is already used. Try Another mobile')
      }
   
    });
  }

}
