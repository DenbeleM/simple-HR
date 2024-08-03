import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { Employee } from './models/employee.model';
import { Company } from './models/company.model';
import { CompanyService } from '../services/company.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode: boolean = false;
  companies: Company[] = [];  // List to hold company data


  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private companyService: CompanyService,  // Injecting the company service
    private dialogRef: MatDialogRef<EmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.employeeForm = this.fb.group({
      id: [this.data ? this.data.id : null],
      firstName: [this.data ? this.data.firstName : '', Validators.required],
      lastName: [this.data ? this.data.lastName : '', Validators.required],
      email: [this.data ? this.data.email : '', [Validators.required, Validators.email]],
      dob: [this.data ? this.data.dob : '', Validators.required],
      companyId: [this.data ? this.data.companyId : '', Validators.required],
      gender: [this.data ? this.data.gender : '', Validators.required]
    });

    this.isEditMode = !!this.data.id;
  }

  ngOnInit(): void {
    this.loadCompanies();  // Load companies when component initializes
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe((companies: Company[]) => {
      this.companies = companies;
    });
  }


  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData: Employee = this.employeeForm.value;
      console.log('Employee Data:', employeeData);  // Add this log to check data

      if (this.isEditMode) {
        this.employeeService.updateEmployee(employeeData).subscribe({
          next: () => this.dialogRef.close(employeeData),
          error: (err) => console.error('Error updating employee:', err)
        });
      } else {
        delete employeeData.id;  // Ensure ID is null or not sent for new employees
        this.employeeService.addEmployee(employeeData).subscribe({
          next: () => this.dialogRef.close(employeeData),
          error: (err) => console.error('Error adding employee:', err)
        });
      }
    } else {
      console.warn('Form is invalid');
    }
  }
}