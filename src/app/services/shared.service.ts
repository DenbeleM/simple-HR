// src/app/services/shared.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private employeeChangeSource = new Subject<void>();
  employeeChange$ = this.employeeChangeSource.asObservable();

  private companyChangeSource = new Subject<void>(); // Add this line
  companyChange$ = this.companyChangeSource.asObservable(); // Add this line

  notifyEmployeeChange(): void {
    this.employeeChangeSource.next();
  }

  notifyCompanyChange(): void { // Add this method
    this.companyChangeSource.next();
  }
}
