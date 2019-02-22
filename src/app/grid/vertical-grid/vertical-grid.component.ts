import { Component, OnInit } from '@angular/core';
import { GridReadyEvent, GridApi, ColumnApi, ColDef } from 'ag-grid';
import { EmployeeService, Employee } from '../../employee.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Utils } from '../../util';
import { FormTextInputComponent } from './form-text-input.component';

@Component({
  selector: 'vertical-grid',
  templateUrl: './vertical-grid.component.html'
})
export class VerticalGridComponent implements OnInit {
  form: FormGroup;
  private api: GridApi;
  private columnApi: ColumnApi;
  private rowData: any[];
  private columnDefs: ColDef[];

  frameworkComponents = {
    formTextInput: FormTextInputComponent
  };

  constructor(private service: EmployeeService, private fb: FormBuilder) {}

  ngOnInit() {
    const employeeData = this.service.getEmployees();
    this.rowData = Utils.transposeData(employeeData, 'name');

    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'name',
        pinned: 'left'
      }
    ];

    const employeeName = employeeData.map(e => e.name);
    employeeName.forEach(eName => this.columnDefs.push(this.langColDef(eName)));

    this.form = this.fb.group({
      employees: this.fb.array(this.getEmployeeFormArray(employeeData))
    });
  }

  getContext() {
    return {
      formArray: this.form.get('employees')
    };
  }
  getEmployeeFormArray(data: Employee[]): any {
    return data.map(d =>
      this.fb.group({
        name: d.name,
        age: d.age,
        phone: d.phone
      })
    );
  }

  gridReady(params: GridReadyEvent) {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }

  private langColDef(langName: string): ColDef {
    return {
      headerName: langName,
      field: langName,
      cellRenderer: 'formTextInput',
      suppressSorting: true
    };
  }
}
