import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cell',
  template: `
    <div *ngIf="formArray" [formGroup]="formGroup">
      <input type="text" [formControlName]="key" pInputText style="width:100%" />
    </div>
  `
})
export class FormCellComponent {
  formArray: FormArray;
  formGroup: FormGroup;

  key: string;
  index: number;
  columnName: string;

  agInit(params: any) {
    this.formArray = params.context.formArray;
    this.columnName = params.column.colDef.headerName;
    this.key = params.context.createKey(params.columnApi, params.column);
    this.index = params.rowIndex;
    this.formGroup = this.formArray.at(params.rowIndex) as FormGroup;
  }

  refresh(params: any): boolean {
    return true;
  }
}
