// src/app/employee/models/company.model.ts
import { Employee } from './employee.model';

export interface Company {
  id: number;
  name: string; // Updated from 'company' to 'name'
  employees: Employee[]; // Include employees
}
