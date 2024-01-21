import { Component, inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-students-data',
  templateUrl: './add-students-data.component.html',
  styleUrls: ['./add-students-data.component.css'],
})
export class AddStudentsDataComponent implements OnInit {
  submitted: boolean = false;
  data:any;
  studentData:any
  addressForm!:FormGroup
  hasUnitNumber = false;

  states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'American Samoa', abbreviation: 'AS' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'District Of Columbia', abbreviation: 'DC' },
    { name: 'Federated States Of Micronesia', abbreviation: 'FM' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Guam', abbreviation: 'GU' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Marshall Islands', abbreviation: 'MH' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Northern Mariana Islands', abbreviation: 'MP' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Palau', abbreviation: 'PW' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Puerto Rico', abbreviation: 'PR' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virgin Islands', abbreviation: 'VI' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' },
  ];

  constructor(private service:DataService, private router:Router, private toastr:ToastrService, private fb:FormBuilder) {
    

  }
  get f() {
    return this.addressForm.controls;
  }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
    studentCode: ['', Validators.required],
    salutation:['',Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    department: ['', Validators.required],
    dob: ['', Validators.required],
    email:['',[Validators.required,Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(10),Validators.minLength(10)]],
      

    });
    this.getStudentData()
  }

  //   <mat-option
  //   *ngFor="let state of states"
  //   [value]="state.abbreviation"
  // >
  //   {{ state.name }}
  // </mat-option>

  onSubmit(): void {
    console.log(this.addressForm.valid);
    
    console.log(this.addressForm.value)
    this.submitted = true;
    if(this.addressForm.invalid){
      return
    }
    let data={
      ...this.addressForm.value,
    }
    this.service.postStudentData(data).subscribe((res:any)=>{
      if(res){
        this.toastr.success('Data Added Successfully');
        this.getStudentData();
        console.log(res)
      }
      else{
        this.toastr.error(res.error)
        console.log('error');
        
      }
    })

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

  getStudentData(){
    this.service.getStudentData().subscribe((res:any)=>{
      if(res){
        console.log(res);
        this.studentData=res;
        this.studentData = res.map((item: any)=>({
          ...item,
          fullName:`${item.firstName} ${item.lastName}`
          
        }))
        this.studentData=this.data.fullName;
      }
      else{
        console.log('error');
      }
    })
  }

  goBack(){
    this.router.navigate(['/home'])
  }

  // onDelete(id:any){
  //   if(confirm('Are you sure want to delete? Yes or No'))
  //   this.service.deleteStudentData(id).subscribe((res:any)=>{
  //     if(res){
  //       this.toastr.success('Data Deleted Successfully');
  //       this.getStudentData();
  //     }
  //     else{
  //       this.toastr.error(res.error)
  //     }
      
  //   })
    
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
        this.service.deleteStudentData(id).subscribe((res: any) => {
          if (res) {
            Swal.fire(
              'Deleted!',
              'The data has been deleted.',
              'success'
            );
            this.getStudentData();
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
          'Cancelled',
          'The data is safe :)',
          'info'
        );
      }
    });
  }

  onReset(){
  if(confirm('Are you sure want to reset the Data?')){
    if('Yes'){
      this.addressForm.reset();
      this.toastr.success('Resetted Successfully');
    }
    else{
      this.toastr.error('Something went error')
    }
  }

  }

  onCancel(){
    if(confirm('Are you sure want to Cancel this one? Saved Data will be lost.')){
      if('Yes'){
        this.toastr.success('Form Cancelled Successfully');;
        this.addressForm.reset()
      }
      else{
        this.toastr.error('Something went wrong. Try Again')
      }
    }

  }
}
