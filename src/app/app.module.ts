import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { CapitalizedPipe } from './Pipe/capitalized.pipe';
import { EditComponent } from './edit/edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ToastrModule } from 'ngx-toastr';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptorInterceptor } from './service/auth-interceptor.interceptor';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxSpinnerModule } from "ngx-spinner";
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { OrderByPipe } from './Pipe/order-by.pipe';
import { AppPipe } from './Pipe/app.pipe';
import { PaginatorModule } from 'primeng/paginator';
@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    AddComponent,
    CapitalizedPipe,
    EditComponent,
    NavigationComponent,
    OrderByPipe,
    AppPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ToastrModule.forRoot(),
    StudentModule,
    AuthModule,
    MatSlideToggleModule,
    NgxSpinnerModule.forRoot(),
    DropdownModule,
    PaginatorModule
  
   
 
  ],
  
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true
    }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
