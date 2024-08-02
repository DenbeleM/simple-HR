import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Employee } from './employee/models/employee.model';
import { Company } from './employee/models/company.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const companies: Company[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', company: 'Google' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', company: 'Microsoft' },
      { id: 3, firstName: 'Jim', lastName: 'Beam', company: 'TikTok' },
      { id: 4, firstName: 'Jill', lastName: 'Brown', company: 'Ride' }
    ];

    const employees: Employee[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dob: '1985-01-15', gender: 'Male', companyId: 1 },
      { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', dob: '1990-05-23', gender: 'Female', companyId: 2 },
      { id: 3, firstName: 'Jim', lastName: 'Beam', email: 'jim.beam@example.com', dob: '1982-12-30', gender: 'Male', companyId: 3 },
      { id: 4, firstName: 'Jill', lastName: 'Smith', email: 'jill.smith@example.com', dob: '1988-07-19', gender: 'Female', companyId: 4 }
    ];

    return { companies, employees };
  }
}
  