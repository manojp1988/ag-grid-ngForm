import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Column, ColumnApi, GridApi, GridReadyEvent, RowNode } from 'ag-grid';
import { FormCellComponent } from './form-cell.component';
import { BranchService } from '../../branch.service';

@Component({
  selector: 'horizontal-grid',
  templateUrl: './horizontal-grid.component.html',
  styles: [
    `
      .container {
        height: 300px;
      }
    `
  ]
})
export class HorizontalGridComponent {
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
