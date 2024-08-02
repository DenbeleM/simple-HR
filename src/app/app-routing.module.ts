import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { CompanyComponent } from './company/company.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeComponent },
  { path: 'companies', component: CompanyComponent },
  { path: '', redirectTo: '/employees', pathMatch: 'full' }, // Redirect to employees by default
  { path: '**', redirectTo: '/employees' } // Wildcard route for a 404 page (optional)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
