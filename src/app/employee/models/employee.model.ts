// src/app/employee/models/employee.model.ts
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  gender: string;
  companyId: number; // Reference to the company
}
