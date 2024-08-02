// src/app/models/employee.model.ts
export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  gender: string;
  companyId: number; // Add this field
}
