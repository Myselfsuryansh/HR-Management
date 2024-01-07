import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { CanDeactivateGuard } from './guard/guard.guard';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  {path:'',component:SignupComponent},
  {path:'home', component:NavigationComponent},
  {path:'add',component:AddComponent},
  {path:'view/:id',component:ViewComponent},
  {path:'edit/:id',component:EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
