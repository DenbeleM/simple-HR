import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { Employee } from './models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  employeeForm: FormGroup;
  dataSource = new MatTableDataSource<Employee>();
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'gender', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id: [''],  // Add id field for editing
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required]
    });

    // Populate form if data is provided (for editing)
    if (this.data) {
      this.employeeForm.patchValue(this.data);
    }

    this.fetchEmployees(); // Fetch employees on initialization
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

  onFormSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;
      if (employeeData.id) {
        // Edit existing employee
        this.employeeService.updateEmployee(employeeData).subscribe({
          next: () => {
            console.log('Employee Updated');
            alert('Employee updated successfully');
            this.dialogRef.close(); // Close the dialog
            this.fetchEmployees(); // Refresh employee list
          },
          error: (err) => {
            console.error('Error updating employee:', err);
          }
        });
      } else {
        // Add new employee
        this.employeeService.addEmployee(employeeData).subscribe({
          next: () => {
            console.log('Employee Added');
            alert('Employee added successfully');
            this.dialogRef.close(); // Close the dialog
            this.fetchEmployees(); // Refresh employee list
          },
          error: (err) => {
            console.error('Error adding employee:', err);
          }
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
