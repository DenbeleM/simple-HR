import { Employee } from "./employee.model";
export interface View {
    id: number;
    name: string;
    employees?: Employee[];

    
  }
  