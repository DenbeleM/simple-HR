import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CompanyService } from '../services/company.service';
import { EmployeeService } from '../services/employee.service';
import { Company } from '../employee/models/company.model';
import { EditDialogComponent } from './edit-dialog.component/edit-dialog.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  displayedColumns: string[] = ['name', 'employees', 'actions'];
  dataSource = new MatTableDataSource<Company>();

  constructor(
    private companyService: CompanyService,
    private employeeService: EmployeeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies(): void {
    this.companyService.getCompanies().subscribe({
      next: (companies: Company[]) => {
        this.dataSource.data = companies;
      },
      error: (err) => {
        console.error('Error fetching companies:', err);
      }
    });
  }

  addCompany(): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { company: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.companyService.addCompany(result).subscribe(() => {
          this.fetchCompanies();
        });
      }
    });
  }

  editCompany(company: Company): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { company }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.companyService.updateCompany(result).subscribe(() => {
          this.fetchCompanies();
        });
      }
    });
  }

  deleteCompany(company: Company): void {
    this.companyService.deleteCompany(company.id).subscribe(() => {
      this.fetchCompanies();
    });
  }
}
