// src/app/in-memory-data.service.ts

import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee/models/employee.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees: Employee[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dob: '2024-01-01', gender: 'Male' }
    ];
    return { employees };
  }

  // Handle POST requests for adding new employees
  post(reqInfo: any) {
    const employees = reqInfo.utils.getDb().employees as Employee[];
    const newEmployee = reqInfo.req.body as Employee;
    
    newEmployee.id = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    employees.push(newEmployee);

    return reqInfo.utils.createResponse$(() => ({
      body: newEmployee,
      status: 201
    }));
  }
}
