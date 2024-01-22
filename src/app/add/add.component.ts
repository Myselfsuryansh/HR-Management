import { Component, OnChanges, OnInit } from '@angular/core';
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
export class AddComponent implements  OnInit {
  nameSearch:string='';
  selectSearch:string=''
  employeeForm!: FormGroup;
  employeeData:any[]=[];
  submitted = false;
  isSaved = false;
  password1: string = '';
  confirmPass: string = '';
  constructor(private fb: FormBuilder, private service:DataService, private toastr:ToastrService, private router:Router) {
    this.filteredEmployeeData = this.employeeData;
  }
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
        this.filteredEmployeeData=res;
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



  sortOrder: string = 'asc';
  sortedColumn: string = ''; // Track the currently sorted column

  sortBy(column: string): void {
    if (column !== 'department') {

      return;
    }

    if (this.sortedColumn === column) {
      // Toggle sorting order for the same column
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // Set sorting order for a new column
      this.sortOrder = 'asc';
      this.sortedColumn = column;
    }

    // Implement sorting logic based on the column
    this.employeeData.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) {
        return this.sortOrder === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
 
  }

  searchTerm: string = '';

  filteredEmployeeData!: any[];

  applyFilter() {
    // Use the filter method to match the search term with employee names
    this.filteredEmployeeData = this.employeeData.filter(data =>
      data.empName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearchChange() {
    this.applyFilter();
  }
 

  

}
