import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr';
import {  of } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  employeeForm!: FormGroup;
  employeeData:any[]=[];
  submitted = false;
  isSaved = false;
  password1: string = '';
  confirmPass: string = '';
  constructor(private fb: FormBuilder, private service:DataService, private toastr:ToastrService, private router:Router) {}
  toggleStatusArray: boolean[] = this.employeeData.map(() => false);
  ngOnInit(): void {
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
      empStatus: ['', Validators.requiredTrue],
    });
    this.getEmployeeData();
  }

  get f() {
    return this.employeeForm.controls;
  }

  onSubmit() {
    if(this.employeeForm.value.empStatus==''){
      this.toastr.error('CheckBox is not checked')
    }
    this.submitted=true;
    this.isSaved = true;
    if (this.employeeForm.invalid) {
      return;
    }
    
    let data ={
      ...this.employeeForm.value
    }
    
    this.service.postData(data).subscribe((res:any)=>{
      
      if(res){
       this.toastr.success('Data Added Successfully')
        this.getEmployeeData();
    
      }
      else{
       this.toastr.error(res.error,'error')
      }
    })
    console.log(this.employeeForm.value);
  }

  getEmployeeData(){
    this.service.getData().subscribe((res:any)=>{
      if(res){
        console.log(res)
        this.employeeData=res;
      }
    })
  }

  cancelBtn(){
    this.employeeForm.reset();
    this.toastr.success('Form Cancelled Successfully')
    if (!this.isSaved) {
      const result = window.confirm('Are your sure want to cancel? Yes or No');
      return of(result);
    }

    return of(true);
    

  }

  resetBtn(){
    this.employeeForm.reset();
    this.toastr.success('Form Resetted Successfully');
    if (!this.isSaved) {
      const result = window.confirm('There are unsaved changes! Are you sure?');
      return of(result);
    }

    return of(true);

  }

  // onDelete(id:any){
    
  //   if(confirm('Are you sure want to delete')){
  //     if('Ok'){
  //       this.service.delete(id).subscribe((res:any)=>{
  //         if(res){
  //           alert('Deleted');
  //           this.getEmployeeData();
  //         }
  //         else{
  //           alert('Error')
  //         }
  //       })
       


  //     }
  //     else{
  //       alert('Check once')
  //     }
  //   }
  // }
  onDelete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((res: any) => {
          if (res) {
            Swal.fire(
              'Deleted!',
              'The data has been deleted.',
              'success'
            );
            this.getEmployeeData();
          } else {
            Swal.fire(
              'Error',
              'Unable to delete the data.',
              'error'
            );
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Not Cancelled',
          'The data is safe :)',
          'info'
        );
      }
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

  // canDeactivate(): Observable<boolean> {
   
  // }

  goBack(){
    this.router.navigate(['/home'])
  }

  password: string = '';
  hidePassword: boolean = true;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  onToggleChange(index: number) {
    this.toggleStatusArray[index] = !this.toggleStatusArray[index];
  }

  

}
