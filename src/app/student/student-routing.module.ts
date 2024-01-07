import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentsDataComponent } from './add-students-data/add-students-data.component';
import { EditStudentsComponent } from './edit-students/edit-students.component';
import { ViewStudentsComponent } from './view-students/view-students.component';

const routes: Routes = [
  {path:'addStudent',component:AddStudentsDataComponent},
  {path:'editStudents/:id',component:EditStudentsComponent},
  {path:'viewStudents/:id',component:ViewStudentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
