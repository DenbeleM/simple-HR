import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';  // Updated import
import { AppRoutingModule } from './app-routing.module'; // Import routing module


import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { InMemoryDataService } from './inmemory-data.service';
import { EmployeeService } from './services/employee.service';
import { CompanyService } from './services/company.service';  // Add this line
import { CompanyComponent } from './company/company.component';

// Angular Material imports
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EditDialogComponent } from './company/edit-dialog.component/edit-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    CompanyComponent  ,// Add this line
    EditDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),

    // Angular Material modules
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatOptionModule,
    MatSelectModule,


    AppRoutingModule // Add routing module here

  ],
  entryComponents: [
    EmployeeComponent,
    CompanyComponent 
    ,EditDialogComponent // Add this line if you're using Angular 8 for dialog components
  ],
  providers: [EmployeeService, CompanyService,],  // Add CompanyService
  bootstrap: [AppComponent]
})
export class AppModule { }
