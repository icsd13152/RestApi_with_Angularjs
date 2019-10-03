import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';


//routing services to navigate between components
const routes: Routes = [

  {path: '', pathMatch: 'full', redirectTo: 'create-employee'},
  {path: 'create-employee',component:EmployeeCreateComponent},
  {path: 'employee-details/:id', component:EmployeeDetailsComponent},
  {path: 'employee-update/:id', component: EmployeeUpdateComponent},
  {path: 'employees-list', component: EmployeeListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
