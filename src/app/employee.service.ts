import { Injectable } from '@angular/core';

export interface Employee {
  name: string;
  age: number;
  phone: string;
}

@Injectable()
export class EmployeeService {
  private employeeData: Employee[] = [
    {
      name: 'Susanne',
      age: 26,
      phone: '+1 (891) 532-2146'
    },
    {
      name: 'Gaines',
      age: 29,
      phone: '+1 (971) 438-3239'
    },
    {
      name: 'Gonzalez',
      age: 35,
      phone: '+1 (896) 482-3953'
    },
    {
      name: 'Knight',
      age: 37,
      phone: '+1 (978) 597-3997'
    },
    {
      name: 'Jackson',
      age: 26,
      phone: '+1 (910) 522-3671'
    },
    {
      name: 'Allison',
      age: 29,
      phone: '+1 (849) 596-2631'
    },
    {
      name: 'Alexander',
      age: 39,
      phone: '+1 (876) 546-2970'
    }
  ];

  getEmployees() {
    return this.employeeData;
  }
}
