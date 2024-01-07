import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {
  itemId:any;
  data:any;
  items:any;
  constructor(private service:DataService, private activatedRouter:ActivatedRoute, private router:Router, private toastr:ToastrService){

  }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((params:any)=>{
      this.itemId = params.get('id')
    });

    this.service.getStudentDataForSpecificId(this.itemId).subscribe((res:any)=>{
      this.items=res;
    })
    
  }

  goBack(){
    this.router.navigate(['/addStudent'])
  }



}
