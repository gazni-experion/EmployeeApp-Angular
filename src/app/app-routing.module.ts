import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [

  //Navigate-- Routes
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'employee/:empId', component: EmployeeComponent },
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'admin', component: AdminComponent,canActivate: [AuthGuard], data: { expectedRole: 'Administrator' } },
  { path: 'manager', component: ManagerComponent,canActivate: [AuthGuard], data: { expectedRole: 'Manager' } },
  { path: 'coordinator', component: CoordinatorComponent,canActivate: [AuthGuard], data: { expectedRole: 'Coordinator' } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
