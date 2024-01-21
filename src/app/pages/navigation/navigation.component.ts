import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements AfterViewInit{
  Drodown: any;

  MyProfile: any;
  constructor(private router:Router){

  }

  ngAfterViewInit(): void {
    this.Drodown = [
      { name: 'My Profile', code: 'NY' },
      { name: 'Logout', code: 'LG' },
      
  ];
  }

  onDropdownChange(event: any): void {
    if (event.value && event.value.code === 'LG') {
      this.Logout();
    }
  }
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    onChangeNavigation(){
     this.router.navigate(['/add']) 
    }

    onChangeNavigationStudent(){
      this.router.navigate(['/addStudent'])
    }

    Logout(){
      this.router.navigate(['/login'])
    }

  

    
}
