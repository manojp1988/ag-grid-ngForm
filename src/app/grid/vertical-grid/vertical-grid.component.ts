import { Component, OnInit } from '@angular/core';
import { GridReadyEvent, GridApi, ColumnApi, ColDef } from 'ag-grid';
import { EmployeeService, Employee } from '../../employee.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Utils } from '../../util';
import { FormTextInputComponent } from './form-text-input.component';

@Component({
  selector: 'vertical-grid',
  templateUrl: './vertical-grid.component.html'
})
export class VerticalGridComponent implements OnInit {
  form: FormGroup;
  name: string;
  private api: GridApi;
  private columnApi: ColumnApi;
  rowData: any[];
  columnDefs: ColDef[];

  get employeesFormArray(): FormArray {
    return this.form.get('employees') as FormArray;
  }

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
    employeeName.forEach(eName => this.columnDefs.push(this.newColDef(eName)));

    this.form = this.fb.group({
      employees: this.fb.array(this.getEmployeeFormArray(employeeData))
    });
  }

  deleteName() {
    const allRecords: Employee[] = this.employeesFormArray.value;
    const index = allRecords.findIndex(e => e.name === this.name);

    const formArray = this.employeesFormArray as FormArray;
    formArray.removeAt(index);

    const columnDefs = this.columnDefs.filter(def => def.field !== this.name);
    this.columnDefs = columnDefs;
  }

  addNewName() {
    const newEmployeeFG = this.fb.group({
      name: this.name,
      age: 0,
      phone: ''
    });

    const newEmployeeColDef = this.newColDef(this.name);

    const formArray = this.employeesFormArray as FormArray;
    formArray.push(newEmployeeFG);

    const columnDefs = this.columnApi.getAllColumns().map(col => col.getColDef());
    columnDefs.push(newEmployeeColDef);

    this.columnDefs = columnDefs;
  }

  getContext() {
    return {
      formArray: this.employeesFormArray
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

  private newColDef(langName: string): ColDef {
    return {
      headerName: langName,
      field: langName,
      cellRenderer: 'formTextInput',
      suppressSorting: true
    };
  }
}
