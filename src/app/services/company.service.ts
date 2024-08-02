import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from '../employee/models/company.model';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companies: Company[] = [
    { firstName: 'John', lastName: 'Doe', company: 'Company A' },
    { firstName: 'Jane', lastName: 'Smith', company: 'Company B' }
  ];

  getCompanies(): Observable<Company[]> {
    return of(this.companies);
  }

  updateCompany(company: Company): Observable<void> {
    const index = this.companies.findIndex(c => c.firstName === company.firstName && c.lastName === company.lastName);
    if (index > -1) {
      this.companies[index] = company;
    }
    return of();
  }
}
