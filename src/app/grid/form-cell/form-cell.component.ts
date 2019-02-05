import { Component } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-cell',
  template: `
    <div *ngIf="formArray" [formGroup]="formArray.at(index)">
      <mat-form-field [floatLabel]="'never'" style="width: 100%">
        <input matInput [formControlName]="key" placeholder="Enter {{ columnName }}" />
      </mat-form-field>
    </div>
  `
})
export class FormCellComponent {
  formArray: FormArray;
  key: string;
  index: number;
  columnName: string;

  agInit(params: any) {
    this.columnName = params.column.colDef.headerName;
    this.key = params.context.createKey(params.columnApi, params.column);
    this.index = params.rowIndex;
  }

  refresh(params: any): boolean {
    this.formArray = params.context.formArray;
    return true;
  }
}
