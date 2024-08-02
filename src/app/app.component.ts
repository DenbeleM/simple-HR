import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Employee } from './employee/models/employee.model';
import { EmployeeService } from './services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeComponent } from './employee/employee.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Crud';
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'gender', 'dob'];
  dataSource = new MatTableDataSource<Employee>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchEmployees();
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

  empForm(): void {
    const dialogRef = this.dialog.open(EmployeeComponent, {
      // width: '800px',
      data: {} // Pass any required data here
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchEmployees(); // Refresh employee list after dialog is closed
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeComponent, {
      width: '400px',
      data: employee // Pass the employee to be edited
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.updateEmployee(result).subscribe({
          next: () => {
            this.fetchEmployees(); // Refresh employee list after editing
          },
          error: (err) => {
            console.error('Error updating employee:', err);
          }
        });
      }
    });
  }
    deleteEmployee(employee: Employee): void {
      this.employeeService.deleteEmployee(employee.id).subscribe({
        next: () => {
          this.fetchEmployees(); // Refresh employee list after deletion
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
        }
      });
    }
}