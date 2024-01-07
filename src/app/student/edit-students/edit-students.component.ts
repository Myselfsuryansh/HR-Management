import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.css'],
})
export class EditStudentsComponent implements OnInit {
  addressForm!: FormGroup;
  submitted =false;
  itemId:any;
  item:any;
  constructor(
    private service: DataService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      studentCode: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      salutation:['',Validators.required],
      gender: ['', Validators.required],
      department: ['', Validators.required],
      dob: ['', Validators.required],
      email:['',[Validators.required,Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(10),Validators.minLength(10)]],
    });

    this.activatedRouter.paramMap.subscribe((params:any)=>{
      this.itemId = params.get('id');
      console.log(this.itemId);
      this.getDataForSpecificId(this.itemId)
    });
    this.service.getStudentDataForSpecificId(this.itemId).subscribe((item:any)=>{
      this.item=item;
    })
  }

  get f(){
    return this.addressForm.controls;
  }

  onUpdate(){
    this.service.updateStudentData(this.itemId,this.addressForm.value).subscribe((res:any)=>{
      if(res){
        this.toastr.success('Data Updated Successfully');
        this.router.navigate(['/addStudent'])
      }
      else{
        this.toastr.error(res.error)
      }
    })

  }

  getDataForSpecificId(id:number){
    this.service.getStudentDataForSpecificId(id).subscribe((data:any)=>{
      this.addressForm.patchValue(data)
    })
  }

  goBack(){
    this.router.navigate(['/addStudent'])
  }
  
}
