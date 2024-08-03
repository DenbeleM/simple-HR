import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Company } from './employee/models/company.model';
import { Employee } from './employee/models/employee.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const companies: Company[] = [
      {
        id: 1,
        name: 'Company A',
        employees: [
          { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dob: '1985-01-15', gender: 'Male', companyId: 1 }
        ]
      },
      {
        id: 2,
        name: 'Company B',
        employees: [
          { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', dob: '1990-05-23', gender: 'Female', companyId: 2 }
        ]
      }
    ];

    const employees: Employee[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dob: '1985-01-15', gender: 'Male', companyId: 1 },
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', dob: '1990-05-23', gender: 'Female', companyId: 2 }
    ];

    return { companies, employees };
  }
}
