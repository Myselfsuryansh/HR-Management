import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endPoint:string='http://localhost:3000/api/diagnosis/';
  headers= new HttpHeaders().set('content-type','application/json');
  currentUser={};


  constructor(private http:HttpClient, public router:Router) { }

  // signIn(user:any){
  //   return this.http.get(this.endPoint,user).subscribe((res:any)=>{
  //     if(res){
  //       localStorage.setItem('access-token',res.token);
  //     }
  //   })
  // }
  signIn(username: any, password: any): Observable<any> {
    return this.http.get(`${this.endPoint}?username=${username}&password=${password}`);
  }

  signUp(user:any){
    return this.http.post(this.endPoint,user)

  }

  getToken(){
    return localStorage.getItem('access-token')
  }

  get isLoggedIn(){
    let authToken =localStorage.getItem('access-token');
    return authToken !=null ? true:false;
  }

  doLogout(){
    let removeToken = localStorage.removeItem('access-token');
    if(removeToken == null){
      this.router.navigate([''])
    }
  }
}
