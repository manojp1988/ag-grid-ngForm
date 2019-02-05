import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Column, ColumnApi, GridApi, GridReadyEvent, RowNode } from 'ag-grid';
import { FormCellComponent } from './form-cell/form-cell.component';
import { BranchService } from '../branch.service';

@Component({
  selector: 'app-grid',
  template: `
    <div class="container" fxLayout="column" fxLayoutAlign="start center">
      <form
        class="dealership-form"
        fxLayout="column"
        fxLayoutAlign="start center"
        (ngSubmit)="onSubmit()"
        [formGroup]="gridForm"
      >
        <ag-grid-angular
          style="width: 700px; height: 300px;"
          class="ag-theme-material"
          [rowData]="rowData"
          [columnDefs]="columnDefs"
          [frameworkComponents]="getComponents()"
          [context]="getContext()"
          [getRowNodeId]="getRowNodeId"
          (rowDataChanged)="refreshFormControls()"
          (gridReady)="gridReady($event)"
        >
        </ag-grid-angular>
        <button
          style="margin-top: 10px; float: right;"
          mat-raised-button
          [disabled]="!gridForm.valid"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>

    <pre> {{ gridForm.value | json }}</pre>
  `,
  styles: [
    `
      .container {
        height: 300px;
      }
    `
  ]
})
export class GridComponent {
  private api: GridApi;
  private columnApi: ColumnApi;

  gridForm: FormGroup = new FormGroup({
    stock: new FormArray([])
  });

  columnDefs;
  rowData;

  constructor(public snackBar: MatSnackBar, private branchService: BranchService) {
    this.columnDefs = [
      { headerName: 'Order #', field: 'orderNumber', width: 110, suppressSizeToFit: true },
      { headerName: 'Make', field: 'make', cellRenderer: 'formCell' },
      { headerName: 'Model', field: 'model', cellRenderer: 'formCell' },
      { headerName: 'Price', field: 'price', cellRenderer: 'formCell' }
    ];
    const currentBranch = this.branchService.getBranchData('Balham');
    this.rowData = currentBranch.stock;
  }

  gridReady(params: GridReadyEvent) {
    this.api = params.api;
    this.columnApi = params.columnApi;

    this.refreshFormControls();

    this.api.sizeColumnsToFit();
  }

  private refreshFormControls() {
    if (this.api) {
      this.createFormControls();
      this.api.refreshCells({ force: true });
    }
  }

  private createFormControls() {
    let columns = this.columnApi.getAllColumns();

    const stockFormArray = <FormArray>this.gridForm.controls['stock'];

    const length = stockFormArray.controls.length;

    for (let i = 0; i < length; i++) stockFormArray.removeAt(i);

    this.api.forEachNode((rowNode: RowNode) => {
      const formGroup: FormGroup = new FormGroup({});
      columns.forEach((column: Column) => {
        const key = this.createKey(this.columnApi, column);
        formGroup.setControl(key, new FormControl(rowNode.data[key]));
      });
      stockFormArray.push(formGroup);
    });
  }

  getRowNodeId(data: any) {
    return data.orderNumber;
  }

  getComponents() {
    return { formCell: FormCellComponent };
  }

  getContext() {
    return {
      formArray: this.gridForm.controls.stock,
      createKey: this.createKey
    };
  }

  onSubmit() {
    console.dir(this.gridForm.value);
  }

  private createKey(columnApi: ColumnApi, column: Column): any {
    return column.getColDef().field;
  }
}
