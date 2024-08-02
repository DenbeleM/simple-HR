import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { CompanyService } from '../services/company.service';
import { Employee } from '../employee/models/employee.model';
import { Company } from '../employee/models/company.model';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  employeeForm: FormGroup;
  companies: any[] = [
    { id: 1, name: 'Google' },
    { id: 2, company: 'TikTok' },
    { id: 3, name: 'Facebook' },
    { id: 4, name: 'Xoka' }
  ];
 dataSource = new MatTableDataSource<Employee>();
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'gender', 'companyName', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    public dialogRef: MatDialogRef<EmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      companyId: ['', Validators.required]
    });

    if (this.data) {
      this.employeeForm.patchValue(this.data);
    }

    this.fetchEmployees();
    this.fetchCompanies();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (employees: Employee[]) => {
        this.dataSource.data = employees;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      }
    });
  }

  fetchCompanies(): void {
    this.companyService.getCompanies().subscribe({
      next: (companies: Company[]) => {
        this.companies = companies;
      },
      error: (err) => {
        console.error('Error fetching companies:', err);
      }
    });
  }

  onFormSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;
      if (employeeData.id) {
        this.employeeService.updateEmployee(employeeData).subscribe({
          next: () => {
            alert('Employee updated successfully');
            this.dialogRef.close();
            this.fetchEmployees();
          },
          error: (err) => {
            console.error('Error updating employee:', err);
          }
        });
      } else {
        this.employeeService.addEmployee(employeeData).subscribe({
          next: () => {
            alert('Employee added successfully');
            this.dialogRef.close();
            this.fetchEmployees();
          },
          error: (err) => {
            console.error('Error adding employee:', err);
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCompanyName(companyId: number): string {
    const company = this.companies.find(c => c.id === companyId);
    return company ? company.name : 'Unknown';
  }
  
}
