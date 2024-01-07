import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  itemId:any;
  item:any
 
  constructor(private service:DataService,private activatedRouter:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((params) => {
      this.itemId = params.get('id'); // Convert the ID to a number (if it's not a string)
      console.log(this.itemId);

      this.service.getDataForSpecificID(this.itemId).subscribe((item:any)=>{
        this.item=item;
        
      })
    });
    
    
    
    
  }
  goBack(){
    this.router.navigate(['/add'])
  }



  

}
