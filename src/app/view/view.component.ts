import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  itemId:any;
  item:any
 
  constructor(private service:DataService,private activatedRouter:ActivatedRoute, private router:Router,private http:HttpClient){}

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((params) => {
      this.itemId = params.get('id'); // Convert the ID to a number (if it's not a string)
      console.log(this.itemId);

      this.service.getDataForSpecificID(this.itemId).subscribe((item:any)=>{
        this.item=item;
        
      })

      
    });

    
    
    
    
    
  }

 

  getFileName(filePath: string): string {
    // Extract and return the file name from the path
    const startIndex = filePath.lastIndexOf('\\') + 1;
    return filePath.substr(startIndex);
  }
  goBack(){
    this.router.navigate(['/add'])
  }

  downloadFile() {
    this.http.get('http://localhost:3000/data').subscribe((response:any) => {
      const file = new Blob(response, { type: 'text/plain' });
      const url = window.URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = `my-file.txt`;
      link.click();
    });
  }
  
  



  

}
