import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService  {

  constructor(private http:HttpClient) { }

  postData(data:any){
    return this.http.post('http://localhost:3000/data',data);
  }

  getData(){
    return this.http.get('http://localhost:3000/data')
  }

  getDataForSpecificID(id:any){
    return this.http.get(`http://localhost:3000/data/${id}`);
  }

  updateData(id:any, data:any){
    return this.http.put(`http://localhost:3000/data/${id}`,data)
  }
  

  delete(id:any){
    return this.http.delete(`http://localhost:3000/data/${id}`)
  }

  postStudentData(data:any){
    return this.http.post('http://localhost:3000/student',data);
  }

  getStudentData(){
    return this.http.get('http://localhost:3000/student')
  }
  getStudentDataForSpecificId(id:any){
    return this.http.get(`http://localhost:3000/student/${id}`);
  }
  updateStudentData(id:any, data:any){
    return this.http.put(`http://localhost:3000/student/${id}`,data)
  }

  deleteStudentData(id:any){
    return this.http.delete(`http://localhost:3000/student/${id}`)
  }

  apiUrl='http://localhost:3000/data'

  checkEmailAvailability(email: string): Observable<boolean> {
    const url = `${this.apiUrl}?email=${email}`;
    return this.http.get<any[]>(url).pipe(map(employees => employees.length === 0));
  }

  checkMobileAvailability(mobile: string): Observable<boolean> {
    const url = `${this.apiUrl}?mobile=${mobile}`;
    return this.http.get<any[]>(url).pipe(map(employees => employees.length === 0));
  }

  

  
}
