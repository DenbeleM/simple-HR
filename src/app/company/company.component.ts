import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from '../employee/models/company.model';
import { CompanyService } from '../services/company.service';
import { EditDialogComponent } from './edit-dialog.component/edit-dialog.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'company', 'actions'];
  dataSource: Company[] = [];

  constructor(private companyService: CompanyService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies(): void {
    this.companyService.getCompanies().subscribe(companies => {
      this.dataSource = companies;
    });
  }

  editCompany(company: Company): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: company
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.companyService.updateCompany(result).subscribe(() => {
          this.fetchCompanies(); // Refresh the list
        });
      }
    });
  }
}
