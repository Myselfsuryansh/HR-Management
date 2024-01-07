import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { AddStudentsDataComponent } from './add-students-data/add-students-data.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { EditStudentsComponent } from './edit-students/edit-students.component';
import { ViewStudentsComponent } from './view-students/view-students.component';


@NgModule({
  declarations: [
    AddStudentsDataComponent,
    EditStudentsComponent,
    ViewStudentsComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
